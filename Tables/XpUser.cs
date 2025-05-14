using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class XpUser
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Account { get; set; } = null!;

    public string Pwd { get; set; } = null!;

    public string DeptId { get; set; } = null!;

    public string? PhotoFile { get; set; }

    public bool Status { get; set; }
}
