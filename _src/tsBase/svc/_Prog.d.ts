export default class _Prog {
    static me: any;
    static initPath: string;
    static init(): void;
    static setBorder(status: boolean): void;
    static storePath(progPath: string): void;
    static resetPath(): void;
    /**
     * set program path
     * param fun {string} fun mode
     */
    static setPath(fun: string, updName?: string): void;
    /**
     * set fun name
     * param name {string} fun name
     */
    static setFunName(name: string): void;
}
