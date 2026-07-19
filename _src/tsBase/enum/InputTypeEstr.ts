//輸入欄位種類, 對應 Base InputTypeEstr 
class InputTypeEstr {
    // 原始物件字面量中的常數值被轉換為 static readonly 屬性，以符合 class 語法
    // 且保持 InputTypeEstr.Check 這樣的外部存取方式。

    static readonly Check = "check";
    static readonly Date = "date";
    static readonly DateTime = "dt";
    static readonly Decimal = "dec";
    static readonly File = "file";
    static readonly Hide = "hide";
    static readonly Html = "html";
    static readonly Integer = "int";
    static readonly Link = "link";
    static readonly Modal = "modal";
    static readonly Password = "pwd";
    static readonly Radio = "radio";
    static readonly Read = "read";
    static readonly Select = "select";
    static readonly Sort = "sort";
    static readonly Text = "text";
    static readonly Textarea = "textarea";
}
window.InputTypeEstr = InputTypeEstr;