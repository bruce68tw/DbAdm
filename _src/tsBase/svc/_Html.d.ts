export default class _Html {
    static loadTheme(color: string): void;
    static loadThemeByElm(): void;
    static encodeRow<T extends Record<string, any>>(row: T, fields: string[]): T;
    static encode(value: unknown): string;
    static decode(value: string): string;
    static update(id: string, box?: JQuery): void;
    static updates(ids: string[], box?: JQuery): void;
}
