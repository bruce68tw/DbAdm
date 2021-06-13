
namespace DbAdm.Enums
{
    /// <summary>
    /// input type, mapping to XpCode.Type=EitemType(for both Eitem & Qitem)
    /// </summary>
    public class QEitemTypeEstr
    {
        //normal text input, no validation
        public const string Hide = "H";
        public const string Text = "T";     //Q
        public const string TextArea = "TA";
        public const string Numeric = "N";  //Q
        public const string Select = "S";   //Q
        public const string CheckBox = "C"; //Q
        public const string Radio = "R";    //Q
        public const string Date = "D";     //Q
        public const string DateTime = "DT";//Q
        public const string File = "F";
        public const string Sort = "SO";
        public const string Modal = "MO";
        public const string Password = "PWD";
        public const string ReadOnly = "RO";
    }
}
