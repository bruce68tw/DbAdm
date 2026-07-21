$(function () {
    _me.init();
});

_vo = {
    //on select bao item
    async onFind() {
        var data = _Json.toStr(_Form.toRow(_me.rform));
        await _Ajax.getJsonA('GetData', { json: data }, function (row) {
            //前端需要筆數, 前端處理則後端sql比較單純
            var rowLen = row['Rows'];     //筆數
            var config: Json = { title: `滿意度問卷統計-共 ${rowLen} 筆資料` };
            config.labels = ['Q1', 'Q2', 'Q3', 'Q4'];           //後端固定的資料欄位
            config.values = [];
            var rows = _Json.toChartRows(row, config.labels);   //x軸轉y軸(Id,Num欄位)
            //計算value, rows.length=config.labels.length
            for (var i = 0; i < rows.length; i++) {
                config.values[i] = parseFloat((rows[i]['Num'] / rowLen).toFixed(1));  //取一位小數
            }
            //todo: temp remark
            //_Chart.hbar('chart', config);
        });
    },

    //on change projectId
    onChgProject() {
        _iSelect.changeParent('_ProjectId', 'ProgId', '', 'GetPrjProgs', false);
    },
};

_me = {
    init () {
        _me.rform = $('#formRead');
    },
}; //class
