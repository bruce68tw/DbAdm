//輸入欄位種類, 對應 Base InputTypeEstr 
export default class InputTypeEstr {
    // 原始物件字面量中的常數值被轉換為 static readonly 屬性，以符合 class 語法
    // 且保持 InputTypeEstr.Check 這樣的外部存取方式。

    static readonly Check: string = "check";
    static readonly Date: string = "date";
    static readonly DateTime: string = "dt";
    static readonly Decimal: string = "dec";
    static readonly File: string = "file";
    static readonly Hide: string = "hide";
    static readonly Html: string = "html";
    static readonly Integer: string = "int";
    static readonly Link: string = "link";
    static readonly Modal: string = "modal";
    static readonly Password: string = "pwd";
    static readonly Radio: string = "radio";
    static readonly Read: string = "read";
    static readonly Select: string = "select";
    static readonly Sort: string = "sort";
    static readonly Text: string = "text";
    static readonly Textarea: string = "textarea";

}