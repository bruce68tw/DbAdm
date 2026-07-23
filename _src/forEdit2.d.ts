//import type XpVo from "./tsView/XpVo";

declare global {

    //擴充 Window 型別
    interface Window {
        //tsView
        UiMany: typeof UiMany;
        UiView: typeof UiView;
        XpVo: typeof XpVo;
    }
    const _xp: XpVo;
}
export { };