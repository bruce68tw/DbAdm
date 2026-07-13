import ChartDto from '../dto/ChartDto';
export default class _Chart {
    static rainbowColors: string[];
    /**
     * show chart
     * param type {string} bar/pie/line
     * param canvasElm {object} canvas Object
     * param dto {model} Chart/ChartGroup, 可加入 config, 屬性datasets -> values !!
     * param percent {bool} show percentage(for pie,doughnut) or not
     */
    private static _show;
    static line(canvasElm: HTMLCanvasElement, dto: ChartDto): any;
    static hbar(canvasElm: HTMLCanvasElement, dto: ChartDto): any;
    static pie(canvasElm: HTMLCanvasElement, dto: ChartDto): any;
    static doughnut(canvasElm: HTMLCanvasElement, dto: ChartDto): any;
    static groupLine(canvasElm: HTMLCanvasElement, dto: ChartDto): any;
    static groupBar(canvasElm: HTMLCanvasElement, dto: ChartDto): any;
    /**
     * show one line chart, called Chart.js
     */
    static drawLine(canvasId: string, ids: string[], values: number[], color: string): void;
    /**
     * initial datatable(use jquery datatables)
     * param {object} canvasElm
     * param {string[]} labels
     * param {number[]} values
     * param {string[]} colors
     * param {json} config: custom config
     * return {Chart}
     */
    static initPie(canvasElm: HTMLCanvasElement, labels: string[], values: number[], colors: string[], config?: any): any;
}
