
//use chart.js
var _chart = {

    //_nowChart: null,

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
     * show one line chart
     * param divId {string}
     * param rows {List<IdNumDto>}
     * param color {string} 
     */
    /*
    line: function (canvasId, rows, color) {
        var ids = [];
        var values = [];
        for (var i=0; i<rows.length; i++) {
            var row = rows[i];
            ids[i] = row.Id;
            values[i] = row.Num;
        }
        _chart.drawLine(canvasId, ids, values, color);
    },

    _clear: function () {
        if (_chart._nowChart != null)
            _chart._nowChart.destroy();
    },
    */

    /**
     * show chart
     * param type {string} bar/pie/line
     * param canvasObj {object} canvas Object
     * param dto {model} Chart/ChartGroup, 可加入 config 
     * param percent {bool} show percentage(for pie,doughnut) or not
     */
    _show: function (type, canvasObj, dto, legend, percent) {
        if (legend == null)
            legend = true;
        if (percent == null)
            percent = false;

        //default config
        var isHbar = (type == 'hbar');
        var config = {
            type: isHbar ? 'bar' : type,
            data: {
                labels: dto.labels,
                datasets: dto.datasets,
            },
            options: {
                //多包一層plugins才能顯示title
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: legend,
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                    title: {
                        display: true,
                        text: dto.title
                    }
                }
            }
        };

        //add ext config.options if any
        if (dto.options != null)
            config.options = _json.copy(dto.options, config.options);

        //add percentage if need
        if (percent) {
            config.options.plugins.tooltip = {
                callbacks: {
                    label: function (ctx) {
                        //注意:不同版本的屬性不同, 以下為3.9.1版 !!
                        //get sum if need
                        var list = ctx.dataset.data;
                        if (ctx.chart._sum == null) {
                            var sum = 0;
                            list.map(a => {
                                sum += a;
                            });
                            ctx.chart._sum = sum;
                        }

                        //save old label if need
                        if (ctx._oldLabel == null)
                            ctx._oldLabel = ctx.label + ' ' + ctx.formattedValue;

                        //get percentage and add tail
                        var percent = (list[ctx.dataIndex] * 100 / ctx.chart._sum).toFixed(2) + "%";
                        return ctx._oldLabel + ' (' + percent + ')';
                    }
                }
            };
        }

        return new Chart(canvasObj, config);
    },
    
    line: function (canvasObj, dto) {
        return _chart._show('line', canvasObj, dto, false);
    },

    hbar: function (canvasObj, dto) {
        dto.options = {
            indexAxis: 'y'
        };
        //debugger;
        return _chart._show('hbar', canvasObj, dto, false);
    },

    pie: function (canvasObj, dto) {
        return _chart._show('pie', canvasObj, dto, null, true);
    },
    
    doughnut: function (canvasObj, dto) {
        return _chart._show('doughnut', canvasObj, dto, null, true);
    },

    groupLine: function (canvasObj, dto) {
        /*
        //set curve line
        dto.datasets.map(a => {
            a.tension = 0;
        });
        */
        return _chart._show('line', canvasObj, dto);
    },

    groupBar: function (canvasObj, dto) {
        return _chart._show('bar', canvasObj, dto);
    },

    /**
     * show one line chart, called Chart.js
     */ 
    drawLine: function (canvasId, ids, values, color) {
        _chart._clear();
        _chart._nowChart = new Chart(document.getElementById(canvasId), {
            type: 'line',
            data: {
                labels: ids,
                datasets: [{
                    //label: "Africa",
                    data: values,
                    borderColor: color,
                    fill: false
                }]
            },
            options: {
                //legend: { display: false },
                plugins: {
                    legend: { display: false },
                },
                /*
                title: {
                    display: true,
                    text: 'World population per region (in millions)'
                }
                */
            }
        });
    },

    /**
     * initial datatable(use jquery datatables)
     * param {object} canvasObj
     * param {string[]} labels
     * param {number[]} values
     * param {string[]} colors
     * param {json} config: custom config
     * return {Chart}
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