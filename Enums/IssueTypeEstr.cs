
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
        public const string Other = "O";        //其他        
    }
}
