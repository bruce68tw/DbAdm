
namespace DbAdm.Enums
{
    /// <summary>
    /// 問題種類, map to XpCode.Type=IssueType
    /// </summary>
    public class IssueTypeEstr
    {
		/// <summary>
		/// 例行工作
		/// </summary>
		public const string Routine = "R";
		/// <summary>
		/// 知識
		/// </summary>
		public const string KM = "K";
		/// <summary>
		/// 會議
		/// </summary>
		public const string Meeting = "M";
		/// <summary>
		/// 請假
		/// </summary>
		public const string Leave = "L";
		/// <summary>
		/// 1.單位回報-系統BUG
		/// </summary>
		public const string RptBug = "US";
		/// <summary>
		/// 2.單位回報-操作詢問
		/// </summary>
		public const string RptOp = "UO";
		/// <summary>
		/// 3.單位回報-人為因素
		/// </summary>
		public const string RptPerson = "UP";
		/// <summary>
		/// 4.單位回報-資料與權限調整
		/// </summary>
		public const string RptAuth = "UA";
		/// <summary>
		/// 其他        
		/// </summary>
		public const string Other = "O";        
    }
}
