using System;
using System.Collections.Generic;

#nullable disable

namespace DbAdm.Tables
{
    public partial class Crud
    {
        public Crud()
        {
            CrudEtable = new HashSet<CrudEtable>();
            CrudQitem = new HashSet<CrudQitem>();
            CrudRitem = new HashSet<CrudRitem>();
        }

        public string Id { get; set; }
        public string ProjectId { get; set; }
        public string ProgCode { get; set; }
        public string ProgName { get; set; }
        public bool LabelHori { get; set; }
        public string ReadSql { get; set; }
        public string TableAs { get; set; }
        public bool HasCreate { get; set; }
        public bool HasUpdate { get; set; }
        public bool HasDelete { get; set; }
        public bool HasView { get; set; }
        public bool HasExport { get; set; }
        public bool HasReset { get; set; }
        public byte AuthType { get; set; }
        public bool Status { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Revised { get; set; }

        public virtual ICollection<CrudEtable> CrudEtable { get; set; }
        public virtual ICollection<CrudQitem> CrudQitem { get; set; }
        public virtual ICollection<CrudRitem> CrudRitem { get; set; }
    }
}
