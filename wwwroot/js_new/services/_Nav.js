export default class _Nav {
    static moveLeft(obj) {
        return obj.insertBefore(obj.prev());
    }
    static moveRight(obj) {
        return obj.insertAfter(obj.next());
    }
} //class
//# sourceMappingURL=../../../_tsBase/wwwroot/map/services/_Nav.js.map