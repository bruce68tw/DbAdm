using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class XpRoleProg
{
    public string Id { get; set; } = null!;

    public string RoleId { get; set; } = null!;

    public string ProgId { get; set; } = null!;

    public byte FunCreate { get; set; }

    public byte FunRead { get; set; }

    public byte FunUpdate { get; set; }

    public byte FunDelete { get; set; }

    public byte FunPrint { get; set; }

    public byte FunExport { get; set; }

    public byte FunView { get; set; }

    public byte FunOther { get; set; }
}
