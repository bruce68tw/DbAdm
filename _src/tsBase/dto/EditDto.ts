export default class EditDto {
    public edits: any[];
    public divEdit: string;
    public updName: string | undefined;

    /**
     * initial jquery datatables, 參數參考前面的建構子
     * @param edits {array} EditDto array, 不可空白
     * @param divEdit {string} div edit id, 不可空白
     * @param updName {string} update name, default by system
     */
    constructor(edits: any[], divEdit: string, updName?: string) {
        this.edits = edits;
        this.divEdit = divEdit; //default _me.divEdit
        this.updName = updName; //default by system
    }
}