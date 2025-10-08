export default class _Tab {
    /**
     * Move the object before its previous sibling in the DOM.
     * @param obj The jQuery object representing the element to move.
     */
    static moveLeft(obj) {
        obj.insertBefore(obj.prev());
    }
    /**
     * Move the object after its next sibling in the DOM.
     * @param obj The jQuery object representing the element to move.
     */
    static moveRight(obj) {
        obj.insertAfter(obj.next());
    }
} //class
//# sourceMappingURL=../../../_tsBase/wwwroot/map/services/_Tab.js.map