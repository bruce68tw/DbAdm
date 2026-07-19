class _Log {

    /**
     * @description 記錄程式時間功能的變數
     */
    static _start: any = 0;      //開始時間
    static _now: any = 0;        //目前時間
    //static _result: string = '';    //目前記錄的內容

    static info(msg: any): void {
        console.log(msg);
    }

    static error(msg: any): void {
        alert(msg);
    }

    /**
     * @description 初始化記錄程式時間功能
     */
    static logTimeInit(name?: string): void {
        _Log._start = new Date();
        _Log._now = _Log._start;
        //_result = "\r\n" + name;
        if (name)
            console.log(name);
    }

    /**
     * @description 記錄程式執行時花用的時間
     */
    static logTime(name: string): void {
        const now: any = new Date();
        //_result += name + ":" + (now - _now) + "/" + (now - _start) + "\r\n";
        const msg = name + ":" + (now - _Log._now) + "/" + (now - _Log._start);
        console.log(msg);
        _Log._now = new Date();    //reset
    }

}
window._Log = _Log;