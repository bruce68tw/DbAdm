export default class _Nav {
    static moveLeft(obj) {
        obj.insertBefore(obj.prev());
    }
    static moveRight(obj) {
        obj.insertAfter(obj.next());
    }
}
