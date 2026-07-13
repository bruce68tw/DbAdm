export default class _Tab {
    static moveLeft(obj) {
        obj.insertBefore(obj.prev());
    }
    static moveRight(obj) {
        obj.insertAfter(obj.next());
    }
}
