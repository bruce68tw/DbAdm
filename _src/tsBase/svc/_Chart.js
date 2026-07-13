import _Json from './_Json';
class _Chart {
    /**
     * show chart
     * param type {string} bar/pie/line
     * param canvasElm {object} canvas Object
     * param dto {model} Chart/ChartGroup, 可加入 config, 屬性datasets -> values !!
     * param percent {bool} show percentage(for pie,doughnut) or not
     */
    static _show(type, canvasElm, dto, legend = true, percent = false) {
        /*
    if (legend == null)
        legend = true;
    if (percent == null)
        percent = false;
        */
        //default config
        var isHbar = (type == 'hbar');
        var config = {
            type: isHbar ? 'bar' : type,
            data: {
                labels: dto.labels,
                /*
                datasets: dto.values,
                */
                datasets: [
                    {
                        //label: "Population (millions)",
                        //backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: dto.values,
                    }
                ]
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
                        text: dto.title,
                        //class: 'xc-title',    //3.x以後不支持
                        font: {
                            size: 16, //temp add
                        },
                    }
                }
            }
        };
        //add ext config.options if any
        if (dto.options != null)
            config.options = _Json.copy(dto.options, config.options);
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
                            list.map((a) => {
                                sum += a;
                            });
                            ctx.chart._sum = sum;
                        }
                        //save old label if need
                        if (ctx._oldLabel == null)
                            ctx._oldLabel = ctx.label + ' ' + ctx.formattedValue;
                        //get percentage and add tail
                        var percentValue = (list[ctx.dataIndex] * 100 / ctx.chart._sum).toFixed(2) + "%";
                        return ctx._oldLabel + ' (' + percentValue + ')';
                    }
                }
            };
        }
        return new Chart(canvasElm, config);
    }
    //線形圖
    static line(canvasElm, dto) {
        return _Chart._show('line', canvasElm, dto, false);
    }
    //水平條狀圖
    static hbar(canvasElm, dto) {
        dto.options = {
            indexAxis: 'y'
        };
        //debugger;
        return _Chart._show('hbar', canvasElm, dto, false);
    }
    //圓餅圖
    static pie(canvasElm, dto) {
        return _Chart._show('pie', canvasElm, dto, null, true);
    }
    //甜甜圈
    static doughnut(canvasElm, dto) {
        return _Chart._show('doughnut', canvasElm, dto, null, true);
    }
    //多個線形圖
    static groupLine(canvasElm, dto) {
        /*
        //set curve line
        dto.datasets.map(a => {
            a.tension = 0;
        });
        */
        return _Chart._show('line', canvasElm, dto);
    }
    //多個線形圖
    static groupBar(canvasElm, dto) {
        return _Chart._show('bar', canvasElm, dto);
    }
    /**
     * show one line chart, called Chart.js
     */
    static drawLine(canvasId, ids, values, color) {
        this._clear();
        this._nowChart = new Chart(document.getElementById(canvasId), {
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
    }
    /**
     * initial datatable(use jquery datatables)
     * param {object} canvasElm
     * param {string[]} labels
     * param {number[]} values
     * param {string[]} colors
     * param {json} config: custom config
     * return {Chart}
     */
    static initPie(canvasElm, labels, values, colors, config) {
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
            config0 = _Json.copy(config, config0);
        return new Chart(canvasElm, config0);
    }
}
//彩虹顏色
_Chart.rainbowColors = [
    "#F32E37",
    "#EABE37",
    "#89E926",
    "#22E352",
    "#2FE5E8",
    "#295AE7",
    "#8828EE",
    "#E629B7",
];
export default _Chart;
