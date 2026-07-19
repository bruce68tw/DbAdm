class _Group {
    static toggle(): void {
        // $(this).next().toggle(); // 簡單切換 show/hide
        _Fun.getMe().parent('.x-group').next().slideToggle(); // 如果想要動畫，用這行
    }
}
window._Group = _Group;