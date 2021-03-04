
namespace DbAdm.Enums
{
    /// <summary>
    /// input type, mapping to Code.type=InputType
    /// </summary>
    public class InputTypeEstr
    {
        //normal text input, no validation
        public const string Hide = "H";
        public const string Text = "T";
        public const string TextArea = "TA";
        public const string Numeric = "N";
        public const string Select = "S";
        public const string CheckBox = "C";
        public const string Radio = "R";
        public const string Date = "D";
        public const string DateTime = "DT";
        public const string File = "F";
        public const string Sort = "SO";
        public const string Modal = "MO";
        public const string Password = "PWD";
        public const string ReadOnly = "RO";
    }
}
