//ex: _fun.FunC -> FunEstr.Create
//for mapping to backend
export default class FunEstr {

    // 變數宣告 var 改用 let, const, 這裡用 static readonly 模擬常數
    // 雖然規則 4 是針對 function 內部的 var，但在 class 內將這些視為常數屬性更合理。
    // 如果必須是靜態屬性，則應使用 static readonly。
    // 由於原始是物件字面量，我將其改為 static readonly 屬性以維持外部存取方式 FunEstr.Create。

    static readonly Create: string = 'C';
    static readonly Read: string = 'R';
    static readonly Update: string = 'U';
    static readonly Delete: string = 'D';
    static readonly View: string = 'V';

}