using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class XpCode
{
    public string Type { get; set; } = null!;

    public string Value { get; set; } = null!;

    public string Name { get; set; } = null!;

    public int Sort { get; set; }

    public string? Ext { get; set; }

    public string? Note { get; set; }
}
