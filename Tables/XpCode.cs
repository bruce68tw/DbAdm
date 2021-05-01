using System;
using System.Collections.Generic;

#nullable disable

namespace DbAdm.Tables
{
    public partial class XpCode
    {
        public string Type { get; set; }
        public string Value { get; set; }
        public string Name { get; set; }
        public int Sort { get; set; }
        public string Ext { get; set; }
        public string Note { get; set; }
    }
}
