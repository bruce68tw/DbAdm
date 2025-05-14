using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class tmpColumnImport
{
    public string? DbName { get; set; }

    public string? TableCode { get; set; }

    public string? ColumnCode { get; set; }

    public string? ColumnName { get; set; }

    public string? DefaultValue { get; set; }

    public string? Note { get; set; }
}
