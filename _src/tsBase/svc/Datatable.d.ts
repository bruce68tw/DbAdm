export default class Datatable {
    dt: any;
    findJson: any;
    recordsFiltered: number;
    defaultShowOk: boolean;
    showWork: boolean;
    private _fnAfterFind;
    private _keepStart;
    private _start;
    private _nowShowOk;
    constructor(selector: string, url: string, dtConfig: any, findJson?: any, fnOk?: (result: any) => any[], tbarHtml?: string, fnAfterFind?: (result: any) => void);
    /**
     * reset found count
     */
    resetCount(): void;
    /**
     * find rows
     * param findJson {json} find condition
     */
    find(findJson: any): void;
    /**
     * refind with same condition for refresh form
     * not show find ok msg
     */
    reload(): void;
}
