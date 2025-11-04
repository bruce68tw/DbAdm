namespace DbAdm.Models
{
    //base class for CrudEitemDto & CrudQitemDto
    public class CrudQEitemDto
    {
        //base
        public string Fid { get; set; } = "";
        public string Name { get; set; } = "";

        //輸入欄位長度限制會用此欄位
        public string DataType { get; set; } = "";

        public bool Required { get; set; }
        public string CheckType { get; set; } = "";
        public string CheckData { get; set; } = "";

        public string InputType { get; set; } = "";
        public string ItemData { get; set; } = "";
        public string PosGroup { get; set; } = "";
        public string LayoutCols { get; set; } = "";
        public string PlaceHolder { get; set; } = "";
        public int Sort { get; set; }
        public int Width { get; set; }

        //extend
        public bool IsGroupStart { get; set; }  //同一列開始
        public bool IsGroupEnd { get; set; }    //同一列結束
        public bool IsGroup { get; set; }       //同一列
    }
}