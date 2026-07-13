interface PageConfig {
    pager: any;
    linker: any;
    action: string;
    showMenu?: boolean;
    pageRowList?: number[];
    onFind?: () => void;
    pageStr: string;
}
export default class Page {
    private pager;
    private linker;
    private action;
    private showMenu;
    private pageRowList;
    private pageArg;
    constructor(config: PageConfig);
    private _init;
    private _getMenuHtml;
    private _getPageArg;
    find(json?: Record<string, any>, page?: number): void;
}
export {};
