using System;
using System.Collections.Generic;

#nullable disable

namespace DbAdm.Tables
{
    public partial class CrudEitem
    {
        public string Id { get; set; }
        public string EtableId { get; set; }
        public string ColumnId { get; set; }
        public string EitemType { get; set; }
        public string ItemData { get; set; }
        public bool Required { get; set; }
        public bool HasCreate { get; set; }
        public bool HasUpdate { get; set; }
        public string PlaceHolder { get; set; }
        public string DefaultValue { get; set; }
        public string PosGroup { get; set; }
        public string LayoutCols { get; set; }
        public int Width { get; set; }
        public string CheckType { get; set; }
        public string CheckData { get; set; }
        public int Sort { get; set; }

        public virtual CrudEtable Etable { get; set; }
    }
}
