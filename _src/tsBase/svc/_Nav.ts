export default class _Nav {

    static moveLeft(obj: any): void {
        obj.insertBefore(obj.prev());
    }

    static moveRight(obj: any): void {
        obj.insertAfter(obj.next());
    }

}