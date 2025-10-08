class _Log {
    //_result: '',    //目前記錄的內容
    static info(msg) {
        console.log(msg);
    }
    static error(msg) {
        alert(msg);
    }
    /**
     * @description 初始化記錄程式時間功能
     */
    static logTimeInit(name) {
        _Log._start = new Date();
        _Log._now = _Log._start;
        //_result = "\r\n" + name;
        if (name)
            console.log(name);
    }
    /**
     * @description 記錄程式執行時花用的時間
     */
    static logTime(name) {
        const now = new Date();
        //_result += name + ":" + (now - _now) + "/" + (now - _start) + "\r\n";
        const msg = name + ":" + (now.getTime() - _Log._now.getTime()) + "/" + (now.getTime() - _Log._start.getTime());
        console.log(msg);
        _Log._now = new Date(); //reset
    }
} //class
/**
 * @description 記錄程式時間功能的變數
 */
_Log._start = new Date(); //開始時間
_Log._now = new Date(); //目前時間
export default _Log;
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/_Log.js.map