
namespace DbAdm.Enums
{
	/// <summary>
	/// 問題種類, map to XpCode.Type=RptType
	/// </summary>
	public class IssueRptTypeEstr
	{
		public const string Teams = "1";		//Teams私訊
		public const string TeamsHelp = "2";	//Teams團隊_資管處_技術/客服平台
		public const string MisDesk = "3";		//資訊需求與報修平台
		public const string BpmForm = "4";			//BPM資訊需求與障礙通報單
		public const string Phone = "5";		//電話
		public const string Mail = "6";			//Mail
		public const string Form = "7";			//Forms表單
		public const string SignDocu = "8";		//公文內簽
		public const string OnSite = "9";		//親臨
		public const string Other = "99";		//其他
    }
}
