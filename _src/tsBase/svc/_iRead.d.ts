export default class _iRead {
    static get(fid: string, form?: JQuery): string;
    static getF(filter: string, form?: JQuery): string;
    static getO(obj: JQuery): string;
    static set(fid: string, value: string | number, form?: JQuery): void;
    static setF(filter: string, value: string | number, form?: JQuery): void;
    static setO(obj: JQuery, value: string | number): void;
}
