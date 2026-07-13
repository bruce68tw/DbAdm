export default class EditDto {
    edits: OneMany[];
    divEdit: JQuery;
    updName?: string;
    /**
     * initial jquery datatables, 參數參考前面的建構子
     * @param edits {array} EditDto array, 不可空白
     * @param divEdit {string} div edit id, 不可空白
     * @param updName {string} update name, default by system
     */
    constructor(edits: OneMany[], divEdit: JQuery, updName?: string);
}
