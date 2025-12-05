
namespace DbAdm.Enums
{
    /// <summary>
    /// 問題種類, map to XpCode.Type=IssueType
    /// </summary>
    public class IssueTypeEstr
    {
        



        public const string Routine = "R";      //例行工作
        public const string KM = "K";           //知識
        public const string Meeting = "M";      //會議
        public const string Leave = "L";        //請假
        public const string RptBug = "US";      //1.單位回報-系統BUG
        public const string RptOp = "UO";       //2.單位回報-操作詢問
        public const string RptPerson = "UP";   //3.單位回報-人為因素
        public const string RptAuth = "UA";     //4.單位回報-資料與權限調整
        public const string Other = "O";        //其他        
    }
}
