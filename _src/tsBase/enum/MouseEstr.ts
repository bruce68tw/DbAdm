//內容為mouse事件名稱
class MouseEstr {
    // 原始物件字面量中的常數值被轉換為 static readonly 屬性，以符合 class 語法
    // 且保持 MouseEstr.RightMenu 這樣的外部存取方式。
    // 使用 as const 以避免 event 警示 !!

    static readonly RightMenu = 'contextmenu';
    static readonly MouseDown = 'mousedown';
    static readonly MouseUp = 'mouseup';
    static readonly MouseMove = 'mousemove';
    static readonly MouseEnter = 'mouseenter';
    static readonly MouseLeave = 'mouseleave';
    static readonly DragStart = 'dragstart';
    static readonly DragEnd = 'dragend';
    static readonly DragMove = 'dragmove';
    static readonly DragOver = 'dragover';
    static readonly DragEnter = 'dragenter';
    static readonly DragLeave = 'dragleave';
    static readonly Drop = 'drop';
}
window.MouseEstr = MouseEstr;