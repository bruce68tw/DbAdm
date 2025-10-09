//內容為mouse事件名稱
export default class MouseEstr {
    // 原始物件字面量中的常數值被轉換為 static readonly 屬性，以符合 class 語法
    // 且保持 MouseEstr.RightMenu 這樣的外部存取方式。
    // 使用 as const 以避免 event 警示 !!

    static readonly ContextMenu = 'contextmenu' as const;
    static readonly MouseDown = 'mousedown' as const;
    static readonly MouseUp = 'mouseup' as const;
    static readonly MouseMove = 'mousemove' as const;
    static readonly MouseEnter = 'mouseenter' as const;
    static readonly MouseLeave = 'mouseleave' as const;
    static readonly DragStart = 'dragstart' as const;
    static readonly DragEnd = 'dragend' as const;
    static readonly DragMove = 'dragmove' as const;
    static readonly DragOver = 'dragover' as const;
    static readonly DragEnter = 'dragenter' as const;
    static readonly DragLeave = 'dragleave' as const;
    static readonly Drop = 'drop' as const;

}