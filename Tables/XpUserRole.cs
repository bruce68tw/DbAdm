using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class XpUserRole
{
    public string Id { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public string RoleId { get; set; } = null!;
}
