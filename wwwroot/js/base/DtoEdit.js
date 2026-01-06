/**
 * 用於多個編輯畫面共用查詢畫面
 */
class DtoEdit {

    /**
     * initial jquery datatables, 參數參考前面的建構子
     * @param edits {array} DtoEdit array, 不可空白
     * @param divEdit {string} div edit id, 不可空白
     * @param updName {string} update name, default by system
     */
    constructor(edits, divEdit, updName) {
        this.edits = edits;
        this.divEdit = divEdit; //default _me.divEdit
        this.updName = updName; //default by system
    }

} //class