using System;
using System.Collections.Generic;

#nullable disable

namespace DbAdm.Tables
{
    public partial class Table
    {
        public string Id { get; set; }
        public string ProjectId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Note { get; set; }
        public bool TranLog { get; set; }
        public bool Status { get; set; }
    }
}
