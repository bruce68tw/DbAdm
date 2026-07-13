export interface SignRow {
    NodeName: string;
    SignerName: string;
    GetTime: string;
    SignStatusName: string;
    Note: string;
}
export default class _Flow {
    static showSignRows(tbody: any, rows: SignRow[] | null | undefined): void;
}
