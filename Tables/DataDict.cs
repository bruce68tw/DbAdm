using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class DataDict
{
    public int Sn { get; set; }

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string DataType { get; set; } = null!;

    public bool Nullable { get; set; }

    public string? DefaultValue { get; set; }

    public string? Note { get; set; }

    /// <summary>
    /// refer XpCode.Type=&apos;TableType&apos;
    /// </summary>
    public string? TableType { get; set; }
}
