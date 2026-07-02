using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class OrgDept
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public byte CorpId { get; set; }

    public string DeptNo { get; set; } = null!;

    public string MgrId { get; set; } = null!;

    /// <summary>
    /// 部門等級, base 1(級別, 區處為1級, 中心為2級)
    /// </summary>
    public byte LevelNo { get; set; }

    public string? UpDeptId { get; set; }

    /// <summary>
    /// 所屬處級部門
    /// </summary>
    public string? L1DeptId { get; set; }

    /// <summary>
    /// 所屬部級部門
    /// </summary>
    public string? L2DeptId { get; set; }

    /// <summary>
    /// 所屬組級部門
    /// </summary>
    public string? L3DeptId { get; set; }

    public bool Status { get; set; }

    public string? Note { get; set; }
}
