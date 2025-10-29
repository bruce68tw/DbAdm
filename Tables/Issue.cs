using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class Issue
{
    public int Sn { get; set; }

    public string Id { get; set; } = null!;

    public string? zz_ProjectId { get; set; }

    public string ProgId { get; set; } = null!;

    public string? OwnerId { get; set; }

    public string IssueType { get; set; } = null!;

    public DateTime? WorkDate { get; set; }

    public short? WorkHours { get; set; }

    public string Title { get; set; } = null!;

    public string? Note { get; set; }

    public bool IsFinish { get; set; }

    /// <summary>
    /// 交辦主管
    /// </summary>
    public string? FromMgr { get; set; }

    public string? RptDeptCode { get; set; }

    public string? RptDeptId { get; set; }

    public string? RptUser { get; set; }

    public string? RptType { get; set; }

    public byte SendTimes { get; set; }

    /// <summary>
    /// 建檔人員
    /// </summary>
    public string Creator { get; set; } = null!;

    /// <summary>
    /// 建檔日期
    /// </summary>
    public DateTime Created { get; set; }

    /// <summary>
    /// 修改人員
    /// </summary>
    public string? Reviser { get; set; }

    /// <summary>
    /// 修改日期
    /// </summary>
    public DateTime? Revised { get; set; }
}
