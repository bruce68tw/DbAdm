using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class tmpColumn
{
    public string Fid { get; set; } = null!;

    public string? TableCode { get; set; }

    public string DataType { get; set; } = null!;

    public bool Nullable { get; set; }

    public string? DefaultValue { get; set; }

    public short Sort { get; set; }

    public string? Note { get; set; }
}
