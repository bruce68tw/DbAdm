class _Ajax {

    /** 
     * ajax return json, 提供 async/callback 2種方式，其中async會多一判斷是否空值(可能已被攔截錯誤)
     * param url {string} action url
     * param data {json} property should be string !!
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {any} 由client決定傳回型態
     */
    static async getJsonA(url: string, data: Json, fnOk?: (res: Json) => void, block?: boolean): Promise<Json> {
        const json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'json',   //return type: ContentType,JsonResult
        };
        return await _Ajax._rpcA(json, fnOk, block);
    }

    static async getJsonsA(url: string, data: Json, fnOk?: (res: Json[]) => void, block?: boolean): Promise<Json[]> {
        const json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'json',   //return type: ContentType,JsonResult
        };
        return await _Ajax._rpcA(json, fnOk, block);
    }

    /**
     * ajax return json by FormData(Fd), for upload file
     * param url {string}
     * param data {FormData}
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/json}
     */
    static async getJsonByFdA(url: string, data: FormData, fnOk?: (res: Json) => void, block?: boolean): Promise<Json> {
        const json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'json',   //return type, TODO: pending test
            cache: false,
            contentType: false, //false!! input type, default 'application/x-www-form-urlencoded; charset=UTF-8'
            processData: false, //false!! (jQuery only) if true it will convert input data to string, then get error !!
        };
        return await _Ajax._rpcA(json, fnOk, block);
    }

    /**
     * ajax return string
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/string}
     */ 
    static async getStrA(url: string, data: Json, fnOk?: (res: string) => void, block?: boolean): Promise<string> {
        const json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'text',   //backend return text(ContentResult with text)
        };
        return await _Ajax._rpcA(json, fnOk, block);
    }

    static async getIntA(url: string, data: Json, fnOk?: (res: number) => void, block?: boolean): Promise<number> {
        const json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'text',   //backend return text(ContentResult with text)
        };
        return await _Ajax._rpcA(json, fnOk, block);
    }

    /**
     * ajax return html string
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/html string}
     */
    static async getViewA(url: string, data: Json, fnOk?: (res: string) => void, block?: boolean): Promise<string> {
        const json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'html',
        };
        return await _Ajax._rpcA(json, fnOk, block);
    }

    /**
     * 使用fetch, 將來考慮取代jquery ajax
     * GET ok, 但是 POST 有問題(所以用GET) !!
     * param url {string} action url
     * param data {json} 傳入參數
     * param elm {element} 如果是XiFile欄位則此參數為必要
     * param fnOk {function} 目前無作用
     * return {file/string(錯誤訊息)/空白(檔案不存在)}
     */
    static async getFileA(url: string, data: Json, elm?: Elm, fnOk?: (res: any) => void): Promise<void> {
        const args = new URLSearchParams(data);
        const resp = await fetch(`${url}?${args}`);
        if (resp.ok) {
            //blob
            const blob = await resp.blob();
            const contentType = resp.headers.get('Content-Type');
            const isImage = contentType && contentType.startsWith('image/');

            //get下載檔名 if any
            let downName = 'download';
            if (elm == null) {
                const disposition = resp.headers.get('Content-Disposition');
                if (disposition) {
                    //1.優先抓 filename* (RFC 5987, UTF-8)
                    let match = disposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
                    if (match && match[1]) {
                        downName = decodeURIComponent(match[1]);
                    } else {
                        //2.fallback: filename=
                        match = disposition.match(/filename\s*=\s*"?([^\";]+)"?/i);
                        if (match && match[1]) {
                            downName = match[1];
                        }
                    }
                }
            } else {
                downName = elm.innerText;
            }

            //圖檔直接顯示, 其他則下載
            if (isImage) {
                const imageUrl = URL.createObjectURL(blob);
                _Tool.showImage(downName, imageUrl);
            } else {
                const a = document.createElement('a');
                const downUrl = URL.createObjectURL(blob);

                a.href = downUrl;
                a.download = downName;
                document.body.appendChild(a);
                a.click();

                //清理
                a.remove();
                URL.revokeObjectURL(downUrl);
            }
        } else {
            //無錯誤訊息表示檔案不存在(後端傳回null)
            let error = await resp.text();
            if (_Var.isEmpty(error)) {
                error = _BR.NoFile;
            }            
            _Tool.msg(error);
        }
    }

    /**
     * ajax call(private), only return success info(include custom message)
     * 使用 async/await 傳回值 for caller 判斷執行結果是否成功
     * param json {json} ajax json
     * param fnOk {function} (optional) callback function
     * //param fnError {function} (optional) callback function
     * param block {bool/object} block ui or not, default true
     * //如果要block modal, 必須傳入 modal object !!
     * return {bool/json/any} ResultDto return null when error
     * bool: fnOk not empty, return false when error
     * json/any: fnOk is empty, return null when error
     */
    private static async _rpcA(json: Json, fnOk?: (res: any) => void, block?: boolean): Promise<any> {
        if (_Var.isEmpty(block)) block = true;
        if (block) _Fun.block();

        //改用 async/await
        let status = false;
        let result: any = null;
        try {
            _Jwt.jsonAddJwtHeader(json);
            result = await $.ajax(json);
            const errMsg = _Ajax.resultToErrMsg(result);

            //先判斷error msg
            if (_Str.notEmpty(errMsg)) {
                result = null;  //reset here !!
                _Tool.msg(errMsg);
            } else if (result && result.ErrorRows && result.ErrorRows.length > 0) {
                //有欄位驗證錯誤, //todo: 多筆區域是否顯示正確?
                const errJson: Json = {};
                for (let i = 0; i < result.ErrorRows.length; i++) {
                    const row: ErrorRowDto = result.ErrorRows[i];
                    const edit = (row.EditNo == 0) 
                        ? _me.edit0 : (_me.crudE as CrudE).getEditByNo(row.EditNo);
                    errJson[row.Fid] = row.Msg;
                    edit.validator.showErrors(errJson);
                }
            //todo: 考慮下載檔案
            } else if (fnOk) {
                fnOk(result);
                status = true;
            }
        } catch (error) {
            console.error(error);
        }

        if (block) _Fun.unBlock();
        return (fnOk == null) ? result : status;
    }

    /**
     * resultDto to error msg string
     * also called by Datatable.js
     * param result {ResultDto} error msg
     */ 
    private static _isBrError(result: string): boolean {
        return (result.length >= 2 && result.substring(0, 2) === _Fun.PreBrError);
    }

    /**
     * resultDto to error msg string
     * also called by Datatable.js
     * param result {ResultDto} error msg
     */ 
    static resultToErrMsg(result: any): string {
        return (result && result[_Fun.FidErrorMsg])
            ? _Ajax.strToErrMsg(result[_Fun.FidErrorMsg])
            : '';
    }

    /**
     * result string to error msg if any
     */ 
    static strToErrMsg(str: string): string {
        if (_Str.isEmpty(str))
            return '';
        if (!_Ajax._isBrError(str))
            return str;

        //case of BR error msg
        const fid = str.substring(2);
        return (_BR[fid])
            ? _BR[fid]
            : _Str.format('_Ajax.strToErrMsg() failed, no BR Fid={0}', fid);
    }
}
window._Ajax = _Ajax;