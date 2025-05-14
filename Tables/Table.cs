using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class Table
{
    public int Sn { get; set; }

    public string Id { get; set; } = null!;

    public string ProjectId { get; set; } = null!;

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Note { get; set; }

    public bool TranLog { get; set; }

    public bool Status { get; set; }
}
