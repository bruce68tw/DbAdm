using System.Collections.Generic;

namespace DbAdm.Models
{
    //for Gen Crud
    public class CrudEtableDto
    {
        //如果有值則mainTable的 Edit View 內容直接套用
        public string CustEview { get; set; } = "";

        //base
        public string Id { get; set; } = "";
        //public string CrudId { get; set; } = "";
        public string TableCode { get; set; } = "";       //table code
        public string TableName { get; set; } = "";       //table name
        public string PkeyFid { get; set; } = "";
        public string FkeyFid { get; set; } = "";
        public string AutoIdLen { get; set; } = "";
        public string OrderBy { get; set; } = "";
        public bool HasCol4 { get; set; }
        public bool HalfWidth { get; set; }

        //extend
        public int Sort { get; set; }           //child table sort, base 0
        public string SortFid { get; set; } = "";     //sort field id
        public List<CrudEitemDto> Eitems { get; set; } = null!;
        //hide item string for edit view
        public List<string>? HideViewStrs { get; set; }
    }
}