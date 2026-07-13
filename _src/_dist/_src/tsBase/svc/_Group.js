import _Fun from './_Fun';
export default class _Group {
    static toggle() {
        // $(this).next().toggle(); // 簡單切換 show/hide
        _Fun.getMe().parent('.x-group').next().slideToggle(); // 如果想要動畫，用這行
    }
}
