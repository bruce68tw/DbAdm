using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class PrjProg
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string ProjectId { get; set; } = null!;

    public short Sort { get; set; }

    public bool Status { get; set; }

    public string Creator { get; set; } = null!;
}
