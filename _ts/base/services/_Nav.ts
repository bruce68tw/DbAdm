export default class _Nav {

    static moveLeft(obj: JQuery): JQuery {
        return obj.insertBefore(obj.prev());
    }
    static moveRight(obj: JQuery): JQuery {
        return obj.insertAfter(obj.next());
    }

} //class