using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class Column
{
    public int Sn { get; set; }

    public string Id { get; set; } = null!;

    public string TableId { get; set; } = null!;

    /// <summary>
    /// old: Code
    /// </summary>
    public string Fid { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string DataType { get; set; } = null!;

    public bool Nullable { get; set; }

    public string? DefaultValue { get; set; }

    public int Sort { get; set; }

    public string? Note { get; set; }

    public bool Status { get; set; }
}
