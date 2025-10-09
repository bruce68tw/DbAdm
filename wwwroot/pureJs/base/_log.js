
var _log = {

    /**
     * @description 記錄程式時間功能的變數
     */
    _start: 0,      //開始時間
    _now: 0,        //目前時間
    //_result: '',    //目前記錄的內容

    info: function (msg) {
        console.log(msg);
    },

    error: function (msg) {
        alert(msg);
    },

    /**
     * @description 初始化記錄程式時間功能
     */
    logTimeInit: function (name) {
        _start = new Date();
        _now = _start;
        //_result = "\r\n" + name;
        if (name)
            console.log(name);
    },

    /**
     * @description 記錄程式執行時花用的時間
     */
    logTime: function (name) {
        var now = new Date();
        //_result += name + ":" + (now - _now) + "/" + (now - _start) + "\r\n";
        var msg = name + ":" + (now - _now) + "/" + (now - _start);
        console.log(msg);
        _now = new Date();;    //reset
    },

}; //class