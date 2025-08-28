
namespace DbAdm.Enums
{
    /// <summary>
    /// input type, mapping to XpCode.Type=EitemType(for both Eitem & Qitem)
    /// </summary>
    public class QEitemTypeEstr
    {
        //normal text input, no validation, map to XpCode.Type=EitemType, Ext=Q when need
        public const string Check = "C";     //Q(means also for Qitem)
        public const string Date = "D";         //Q
        public const string DateTime = "DT";    //Q
        public const string Decimal = "DEC";    //Q
        public const string File = "F";
        public const string Hide = "H";
        public const string Html = "HTML";
        public const string Integer = "INT";    //Q
        public const string Modal = "MO";
        public const string Password = "PWD";
        public const string Radio = "R";        //Q
        public const string ReadOnly = "RO";
        public const string Select = "S";       //Q
        public const string Sort = "SO";
        public const string Text = "T";         //Q
        public const string Textarea = "TA";
    }
}
