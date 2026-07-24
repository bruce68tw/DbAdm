declare global {

    //擴充 window 型別 for tsView
    interface Window {
        UiMany: typeof UiMany;
        UiView: typeof UiView;
    }
}
export { };