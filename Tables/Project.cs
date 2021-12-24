using System;
using System.Collections.Generic;

#nullable disable

namespace DbAdm.Tables
{
    public partial class Project
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string DbName { get; set; }
        public string ProjectPath { get; set; }
        public string ConnectStr { get; set; }
        public bool Status { get; set; }
    }
}
