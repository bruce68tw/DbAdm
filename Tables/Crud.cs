using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class Crud
{
    public string Id { get; set; } = null!;

    public string ProjectId { get; set; } = null!;

    /// <summary>
    /// 是否dragdrop UI
    /// </summary>
    public bool IsUi { get; set; }

    public string ProgCode { get; set; } = null!;

    public string ProgName { get; set; } = null!;

    public bool LabelHori { get; set; }

    public string ReadSql { get; set; } = null!;

    public string? TableAs { get; set; }

    public bool HasCreate { get; set; }

    public bool HasUpdate { get; set; }

    public bool HasDelete { get; set; }

    public bool HasView { get; set; }

    public bool HasExport { get; set; }

    public bool HasReset { get; set; }

    /// <summary>
    /// 權限種類, 0(無), 1(Ctrl), 2(Action)
    /// </summary>
    public byte AuthType { get; set; }

    public bool Status { get; set; }

    public string? Creator { get; set; }

    public DateTime Created { get; set; }

    public string? Reviser { get; set; }

    public DateTime? Revised { get; set; }
}
