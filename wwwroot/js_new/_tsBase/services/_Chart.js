import { Chart } from "chart.js";
// 這行很重要：要先註冊所有內建組件
//Chart.register(...registerables);
// 假設的依賴靜態類別
import _Json from "./_Json";
/**
 * Chart.js utility class
 */
class _Chart {
    /**
     * show one line chart
     * param divId {string}
     * param rows {List<IdNumDto>}
     * param color {string}
     */
    /*
    static line(canvasId: string, rows: { Id: string, Num: number }[], color: string): void {
        const ids: string[] = [];
        const values: number[] = [];
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            ids[i] = row.Id;
            values[i] = row.Num;
        }
        _Chart.drawLine(canvasId, ids, values, color);
    }

    private static _clear(): void {
        if (_Chart._nowChart != null)
            _Chart._nowChart.destroy();
    }
    */
    /**
     * show chart (private implementation)
     * param type {string} bar/pie/line/hbar
     * param canvasObj {HTMLCanvasElement} canvas Object (or JQuery object that wraps it)
     * param dto {ChartDataDto} Chart/ChartGroup model, 可加入 config, 屬性datasets -> values !!
     * param legend {boolean} show legend or not, default true
     * param percent {boolean} show percentage(for pie,doughnut) or not, default false
     * return {any} Chart object
     */
    static _show(type, canvasObj, dto, legend, percent) {
        if (legend == null)
            legend = true;
        if (percent == null)
            percent = false;
        //default config
        const isHbar = (type === 'hbar');
        let config = {
            type: isHbar ? 'bar' : type,
            data: {
                labels: dto.labels,
                /*
                datasets: dto.values,
                */
                datasets: dto.datasets ? dto.datasets : [
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
        if (dto.options != null) {
            // 假設 _Json.copy 能夠正確地合併 JSON 物件
            config.options = _Json.copy(dto.options, config.options);
        }
        //add percentage if need
        if (percent) {
            // 初始化 tooltip 結構
            if (!config.options.plugins.tooltip) {
                config.options.plugins.tooltip = { callbacks: {} };
            }
            config.options.plugins.tooltip.callbacks.label = function (ctx) {
                //注意:不同版本的屬性不同, 以下為3.9.1版 !!
                //get sum if need
                const list = ctx.dataset.data;
                if (ctx.chart._sum == null) {
                    let sum = 0;
                    // 使用 list.map 是為了遍歷，但更好的做法是用 reduce 或 for 迴圈
                    // 這裡保持原始碼的 .map 寫法，但使用 for 迴圈更簡潔
                    for (const num of list) {
                        sum += num;
                    }
                    ctx.chart._sum = sum;
                }
                //save old label if need
                if (ctx._oldLabel == null)
                    ctx._oldLabel = ctx.label + ' ' + ctx.formattedValue;
                //get percentage and add tail
                const percentValue = (list[ctx.dataIndex] * 100 / ctx.chart._sum).toFixed(2) + "%";
                return ctx._oldLabel + ' (' + percentValue + ')';
            };
        }
        // 假設 Chart 類別已經定義
        return new Chart(canvasObj, config);
    }
    //線形圖
    static line(canvasObj, dto) {
        return _Chart._show('line', canvasObj, dto, false);
    }
    //水平條狀圖
    static hbar(canvasObj, dto) {
        dto.options = {
            indexAxis: 'y'
        };
        //debugger;
        return _Chart._show('hbar', canvasObj, dto, false);
    }
    //圓餅圖
    static pie(canvasObj, dto) {
        // null 傳入 _show 會使 legend 預設為 true (內建邏輯)
        return _Chart._show('pie', canvasObj, dto, null, true);
    }
    //甜甜圈
    static doughnut(canvasObj, dto) {
        return _Chart._show('doughnut', canvasObj, dto, null, true);
    }
    //多個線形圖
    static groupLine(canvasObj, dto) {
        /*
        //set curve line
        dto.datasets.map(a => {
            a.tension = 0;
        });
        */
        return _Chart._show('line', canvasObj, dto);
    }
    //多個線形圖
    static groupBar(canvasObj, dto) {
        return _Chart._show('bar', canvasObj, dto);
    }
    /**
     * show one line chart, called Chart.js (舊版實作)
     */
    static drawLine(canvasId, ids, values, color) {
        // _Chart._clear(); // 註解掉
        // _Chart._nowChart = new Chart(...) // 註解掉
        // 假設 Chart 類別已經定義
        return new Chart(document.getElementById(canvasId), {
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
     * param canvasObj {any} canvas Object
     * param labels {string[]}
     * param values {number[]}
     * param colors {string[]}
     * param config {any} custom config
     * return {any} Chart
     */
    static initPie(canvasObj, labels, values, colors, config) {
        //default config
        let config0 = {
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
                plugins: {
                    legend: {
                        position: 'right',
                        //fullWidth: false,
                        labels: {
                            boxWidth: 10,
                            //padding: 5,
                        },
                    },
                }
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
            // 假設 _Json.copy 能夠正確地合併 JSON 物件
            config0 = _Json.copy(config, config0);
        // 假設 Chart 類別已經定義
        return new Chart(canvasObj, config0);
    }
}
//_nowChart: any = null; // 註解掉的屬性
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
//# sourceMappingURL=../../../map/_tsBase/services/_Chart.js.map