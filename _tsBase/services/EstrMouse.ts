//內容為mouse事件名稱
export default class EstrMouse {
    // 原始物件字面量中的常數值被轉換為 static readonly 屬性，以符合 class 語法
    // 且保持 EstrMouse.RightMenu 這樣的外部存取方式。

    static readonly RightMenu: string = 'contextmenu';
    static readonly MouseDown: string = 'mousedown';
    static readonly MouseUp: string = 'mouseup';
    static readonly MouseMove: string = 'mousemove';
    static readonly MouseEnter: string = 'mouseenter';
    static readonly MouseLeave: string = 'mouseleave';
    static readonly DragStart: string = 'dragstart';
    static readonly DragEnd: string = 'dragend';
    static readonly DragMove: string = 'dragmove';
    static readonly DragOver: string = 'dragover';
    static readonly DragEnter: string = 'dragenter';
    static readonly DragLeave: string = 'dragleave';
    static readonly Drop: string = 'drop';

}