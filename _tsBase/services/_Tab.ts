export default class _Tab {

    /**
     * Move the object before its previous sibling in the DOM.
     * @param obj The jQuery object representing the element to move.
     */
    static moveLeft(obj: JQuery): void {
        obj.insertBefore(obj.prev());
    }

    /**
     * Move the object after its next sibling in the DOM.
     * @param obj The jQuery object representing the element to move.
     */
    static moveRight(obj: JQuery): void {
        obj.insertAfter(obj.next());
    }

} //class