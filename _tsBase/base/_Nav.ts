export default class _Nav {

    public static moveLeft(obj: JQuery): JQuery {
        return obj.insertBefore(obj.prev());
    }
    public static moveRight(obj: JQuery): JQuery {
        return obj.insertAfter(obj.next());
    }

} //class