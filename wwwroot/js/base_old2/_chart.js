
//use chart.js
var _chart = {

    //彩虹顏色
    rainbowColors: [
        "#F32E37",
        "#EABE37",
        "#89E926",
        "#22E352",
        "#2FE5E8",
        "#295AE7",
        "#8828EE",
        "#E629B7",
    ],

    /**
     * @description initial datatable(use jquery datatables)
     * @param {object} canvasObj
     * @param {string[]} labels
     * @param {number[]} values
     * @param {string[]} colors
     * @param {json} config: custom config
     * @return {Chart}
     */
    initPie: function (canvasObj, labels, values, colors, config) {

        //default config
        var config0 = {
            type: 'pie',
            options: {
                /*
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    },
                },
                */
                legend: {
                    position: 'right',
                    //fullWidth: false,
                    labels: {
                        boxWidth: 10,
                        //padding: 5,
                    },
                },
            },
            data: {
                labels: labels, // 標題
                datasets: [{
                    //label: "# of Votes", // 標籤
                    data: values, // 資料
                    backgroundColor: colors,
                    borderWidth: 1 // 外框寬度
                }]
            },
        };

        //加入外部傳入的自定義組態
        if (config)
            config0 = _json.copy(config, config0);
        return new Chart(canvasObj, config0);
    },

}; //class