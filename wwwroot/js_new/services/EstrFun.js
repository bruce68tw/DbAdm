//ex: _fun.FunC -> EstrFun.Create
//for mapping to backend
class EstrFun {
}
// 變數宣告 var 改用 let, const, 這裡用 static readonly 模擬常數
// 雖然規則 4 是針對 function 內部的 var，但在 class 內將這些視為常數屬性更合理。
// 如果必須是靜態屬性，則應使用 static readonly。
// 由於原始是物件字面量，我將其改為 static readonly 屬性以維持外部存取方式 EstrFun.Create。
EstrFun.Create = 'C';
EstrFun.Read = 'R';
EstrFun.Update = 'U';
EstrFun.Delete = 'D';
EstrFun.View = 'V';
export default EstrFun;
//# sourceMappingURL=../../../_tsBase/wwwroot/map/services/EstrFun.js.map