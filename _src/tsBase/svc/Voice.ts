/**
 * 共用工具視窗的麥克風錄音控制器，由 _Tool.init 建立一個實例。
 * 公開入口：showVoice 開窗、onStartRecA 切換錄音、startRecA 開始、stopRec 停止。
 * 按「結束錄音」後上傳完整音檔；關窗、離頁與裝置錯誤則丟棄。
 * 後端回傳逐字稿供視窗顯示；目前不執行業務指令。
 */
class Voice {
    private modal: JQuery;
    private btnRec: JQuery;
    private timer: JQuery;
    private status: JQuery;
    private startLabel: string;
    private recording = false;
    private pending = false;
    private uploading = false;
    private upload: AbortController | null = null;
    private readonly maxBytes = 10 * 1024 * 1024;
    private isOpen = false;
    // 每次停止或關窗使請求失效；無法取消的權限請求回來後只能釋放音軌。
    private session = 0;
    private activeRecording: { stream: MediaStream; recorder: MediaRecorder; timer: number; chunks: Blob[]; bytes: number; send: boolean } | null = null;
    private actionUrl = '';

    constructor() {
        // BaseWeb XgTool 的外部 DOM 契約，沿用共用元件的 class。
        this.modal = $('.x-voice');
        this.btnRec = this.modal.find('.x-btn-rec');
        this.timer = this.modal.find('.x-timer');
        this.status = this.modal.find('.x-status').attr('role', 'status').attr('aria-live', 'polite');
        this.startLabel = this.btnRec.text();
        this.btnRec.on('click', () => { void this.onStartRecA(); });
        this.modal.on('show.bs.modal', () => {
            this.isOpen = true;
            this.timer.text('00:00');
            this.setVoiceStatus('按下按鈕開始錄音。');
        });
        // hide 在淡出開始時觸發，立即停用麥克風，不等動畫結束。
        this.modal.on('hide.bs.modal', () => {
            this.isOpen = false;
            this.stopRec();
        });
        $(window).on('pagehide', () => {
            this.isOpen = false;
            this.stopRec();
        });
    }

    private setVoiceStatus(text: string, isRed = false): void {
        this.status.text(text).toggleClass('text-danger', isRed).toggleClass('text-secondary', !isRed);
    }

    showVoice(actionUrl: string): void {
        this.actionUrl = actionUrl;
        _Modal.show(this.modal);
    }

    /** 可重複呼叫；先解除目前錄音的關聯，避免稍後的 stop/error 事件覆寫新一輪狀態。 */
    stopRec(): void {
        this.session++;
        this.upload?.abort();
        this.upload = null;
        this.uploading = false;
        this.pending = false;
        this.recording = false;
        const active = this.activeRecording;
        this.activeRecording = null;
        if (active) {
            window.clearInterval(active.timer);
            active.chunks.length = 0;
            active.recorder.ondataavailable = null;
            active.recorder.onerror = null;
            active.recorder.onstop = null;
            try {
                if (active.recorder.state !== 'inactive') active.recorder.stop();
            } finally {
                this.releaseStream(active.stream);
            }
        }
        this.btnRec.text(this.startLabel).removeClass('btn-danger').addClass('btn-primary');
        _Btn.setEdit(this.btnRec, true);
    }

    async onStartRecA(): Promise<void> {
        if (this.recording) {
            const active = this.activeRecording;
            if (!active || active.send) return;
            active.send = true;
            this.recording = false;
            this.pending = true;
            window.clearInterval(active.timer);
            _Btn.setEdit(this.btnRec, false);
            this.setVoiceStatus('正在整理錄音…');
            // stop 後還有最後一個 dataavailable，須等 onstop 才組合音檔。
            try {
                active.recorder.stop();
            } catch {
                this.stopRec();
                this.setVoiceStatus('無法結束錄音，請重試。', true);
            } finally {
                this.releaseStream(active.stream);
            }
        } else if (!this.pending && !this.uploading) {
            await this.startRecA();
        }
    }

    /** 只在開窗後由使用者點擊請求權限；等待期間禁止重複請求。 */
    async startRecA(): Promise<void> {
        if (!this.isOpen || this.pending || this.recording || this.uploading) return;
        if (!window.isSecureContext) {
            this.setVoiceStatus('錄音需要 HTTPS 或 localhost。', true);
            return;
        }
        if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
            this.setVoiceStatus('此瀏覽器不支援錄音。', true);
            return;
        }
        const requestSession = ++this.session;
        let stream: MediaStream | null = null;
        this.pending = true;
        _Btn.setEdit(this.btnRec, false);
        this.setVoiceStatus('正在請求麥克風權限…');
        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (!this.isOpen || requestSession !== this.session) {
                this.releaseStream(stream);
                return;
            }
            const recorder = new MediaRecorder(stream);
            const active = { stream, recorder, timer: 0, chunks: [] as Blob[], bytes: 0, send: false };
            this.activeRecording = active;
            recorder.onerror = () => {
                if (this.activeRecording !== active) return;
                this.stopRec();
                this.setVoiceStatus('錄音發生錯誤，請重試。', true);
            };
            recorder.ondataavailable = event => {
                if (this.activeRecording !== active || !event.data.size) return;
                active.bytes += event.data.size;
                if (active.bytes > this.maxBytes) {
                    this.stopRec();
                    this.setVoiceStatus('錄音超過 10 MB，請縮短後重錄。', true);
                    return;
                }
                active.chunks.push(event.data);
            };
            recorder.onstop = () => {
                if (this.activeRecording !== active) return;
                const audio = new Blob(active.chunks, { type: recorder.mimeType || active.chunks[0]?.type });
                const send = active.send;
                this.stopRec();
                if (send && this.isOpen) void this.sendVoiceA(audio, this.session);
                else this.setVoiceStatus('錄音已中止，未送出。');
            };
            // 分段暫存，後端接收的是所有片段組成的完整音檔。
            recorder.start(1000);
            this.recording = true;
            this.pending = false;
            const startedAt = Date.now();
            this.timer.text('00:00');
            active.timer = window.setInterval(() => {
                const elapsed = Math.floor((Date.now() - startedAt) / 1000);
                this.timer.text(String(Math.floor(elapsed / 60)).padStart(2, '0') + ':' +
                    String(elapsed % 60).padStart(2, '0'));
            }, 250);
            this.btnRec.text('結束錄音').removeClass('btn-primary').addClass('btn-danger');
            _Btn.setEdit(this.btnRec, true);
            this.setVoiceStatus('錄音中');
        } catch (error) {
            if (stream) this.releaseStream(stream);
            // 舊請求的失敗不能重設已重新開啟的視窗或新錄音。
            if (this.isOpen && requestSession === this.session) {
                this.stopRec();
                const name = (error as DOMException)?.name;
                const message = name === 'NotAllowedError' ? '無法使用麥克風，請確認瀏覽器權限。' :
                    name === 'NotFoundError' ? '找不到可用的麥克風。' :
                    name === 'NotReadableError' ? '無法讀取麥克風，請確認裝置是否被占用。' :
                    '無法開始錄音，請確認麥克風後重試。';
                this.setVoiceStatus(message, true);
            }
        }
    }

    /** 上傳採 multipart/form-data，欄位 audio 對應 VoiceController.Cmd 的 IFormFile。 */
    private async sendVoiceA(voice: Blob, session: number): Promise<void> {
        if (!voice.size) {
            this.setVoiceStatus('沒有錄到音訊，請重試。', true);
            return;
        }
        const upload = new AbortController();
        this.upload = upload;
        this.uploading = true;
        _Btn.setEdit(this.btnRec, false);
        this.setVoiceStatus('正在傳送並辨識語音…');
        try {
            // MediaRecorder 產生壓縮容器，先解碼成取樣資料，再編碼為真正的 WAV。
            const wav = await this.toWavA(voice);
            if (!this.isOpen || session !== this.session || upload.signal.aborted) return;
            // 伺服器產生 URL，以支援部署於虛擬目錄；CSRF token 由 Layout 提供。
            const data = new FormData();
            data.append('audio', wav, 'voice.wav');
            data.append('__RequestVerificationToken', $('meta[name="csrf-token"]').attr('content') || '');
            const resp = await fetch(this.actionUrl, {
                method: 'POST', body: data, signal: upload.signal, credentials: 'same-origin'
            });
            const result = await resp.json();
            if (!this.isOpen || session !== this.session) return;
            if (!resp.ok || !result.Success) {
                this.setVoiceStatus(result.Message || '語音辨識失敗，請稍後重試。', true);
                return;
            }

            //here!!
            //case ok
            //檢查是否找到功能
            //var progName = result.ProgName;
            _Leftmenu.clickByName(result.ProgName);    //開啟功能

            // 使用 text() 顯示逐字稿，不得將音訊中的文字作為 HTML 或程式執行。
            //this.setVoiceStatus(result.Text ? '辨識結果：' + result.Text : result.Message || '未辨識到人聲，請重新錄音。');
            _Modal.hide(this.modal);    //關閉modal            
        } catch (error) {
            if (this.isOpen && session === this.session) {
                this.setVoiceStatus(error instanceof RangeError
                    ? '轉換後的 WAV 超過 10 MB 或沒有音訊，請縮短錄音後重試。'
                    : '錄音轉換或傳送失敗，請重新錄音後再試。', true);
            }
        } finally {
            if (this.upload === upload) {
                this.upload = null;
                this.uploading = false;
                _Btn.setEdit(this.btnRec, true);
            }
        }
    }

    /** 解碼瀏覽器錄音後輸出單聲道 16-bit WAV；取樣率採解碼器實際輸出值。 */
    private async toWavA(audio: Blob): Promise<Blob> {
        const context = new AudioContext({ sampleRate: 16000 });
        try {
            const decoded = await context.decodeAudioData(await audio.arrayBuffer());
            const dataBytes = decoded.length * 2;
            if (!decoded.length || dataBytes + 44 > this.maxBytes)
                throw new RangeError('WAV size is outside the supported range.');
            const bytes = new ArrayBuffer(44 + dataBytes);
            const view = new DataView(bytes);
            const writeText = (offset: number, text: string) => {
                for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
            };
            writeText(0, 'RIFF'); view.setUint32(4, 36 + dataBytes, true);
            writeText(8, 'WAVE'); writeText(12, 'fmt '); view.setUint32(16, 16, true);
            view.setUint16(20, 1, true); view.setUint16(22, 1, true);
            view.setUint32(24, decoded.sampleRate, true); view.setUint32(28, decoded.sampleRate * 2, true);
            view.setUint16(32, 2, true); view.setUint16(34, 16, true);
            writeText(36, 'data'); view.setUint32(40, dataBytes, true);
            const channels = Array.from({ length: decoded.numberOfChannels }, (_, i) => decoded.getChannelData(i));
            for (let i = 0; i < decoded.length; i++) {
                let sample = 0;
                for (const channel of channels) sample += channel[i];
                sample = Math.max(-1, Math.min(1, sample / channels.length));
                view.setInt16(44 + i * 2, Math.round(sample * (sample < 0 ? 32768 : 32767)), true);
            }
            return new Blob([bytes], { type: 'audio/wav' });
        } finally {
            await context.close();
        }
    }

    private releaseStream(stream: MediaStream): void {
        stream.getTracks().forEach(track => track.stop());
    }
}
window.Voice = Voice;
