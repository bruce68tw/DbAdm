import { CrudR, _Ajax, _Chart, _Form, _Json, _iSelect } from "@baseJs";

_me = {
    init: function () {
        _me.rform = $('#formRead');
    },

    //on select bao item
    onFind: async function () {
        var data = _Json.toStr(_Form.toRow(_me.rform));
        await _Ajax.getJsonA('GetData', { json: data }, function (row) {
            //前端需要筆數, 前端處理則後端sql比較單純
            var rowLen = row['Rows'];     //筆數
            var config:Json = { title: `滿意度問卷統計-共 ${rowLen} 筆資料` };
            config.labels = ['Q1', 'Q2', 'Q3', 'Q4'];           //後端固定的資料欄位
            config.values = [];
            var rows = _Json.toChartRows(row, config.labels);   //x軸轉y軸(Id,Num欄位)
            //計算value, rows.length=config.labels.length
            for (var i=0; i<rows.length; i++){
                config.values[i] = parseFloat((rows[i]['Num'] / rowLen).toFixed(1));  //取一位小數
            }
            //todo: temp remark
            //_Chart.hbar('chart', config);

            /*
// Bar chart
new Chart(document.getElementById("chart"), {
type: 'bar',
data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
    {
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433]
    }
    ]
},
options: {
    legend: { display: false },
    title: {
    display: true,
    text: 'Predicted world population (millions) in 2050'
    }
}
});
*/
        });
    },

    //on change projectId
    onChgProject: function () {
        _iSelect.changeParent('_ProjectId', 'ProgId', '', 'GetPrjProgs', false);
    },

}; //class
