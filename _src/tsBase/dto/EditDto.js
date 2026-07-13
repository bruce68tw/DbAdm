export default class EditDto {
    /**
     * initial jquery datatables, 參數參考前面的建構子
     * @param edits {array} EditDto array, 不可空白
     * @param divEdit {string} div edit id, 不可空白
     * @param updName {string} update name, default by system
     */
    constructor(edits, divEdit, updName) {
        this.edits = edits;
        this.divEdit = divEdit; //default _me.divEdit
        this.updName = updName; //default by system
    }
}
