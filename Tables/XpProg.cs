using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class XpProg
{
    public string Id { get; set; } = null!;

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Icon { get; set; }

    public string? Url { get; set; }

    public short Sort { get; set; }

    public byte AuthRow { get; set; }

    public byte FunCreate { get; set; }

    public byte FunRead { get; set; }

    public byte FunUpdate { get; set; }

    public byte FunDelete { get; set; }

    public byte FunPrint { get; set; }

    public byte FunExport { get; set; }

    public byte FunView { get; set; }

    public byte FunOther { get; set; }
}
