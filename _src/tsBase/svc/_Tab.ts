export default class _Tab {
    static moveLeft(obj: JQuery): void {
        obj.insertBefore(obj.prev());
    }

    static moveRight(obj: JQuery): void {
        obj.insertAfter(obj.next());
    }
}