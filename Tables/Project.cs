using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class Project
{
    public string Id { get; set; } = null!;

    public string? Name { get; set; }

    public string Code { get; set; } = null!;

    public string DbName { get; set; } = null!;

    public byte DbType { get; set; }

    public string ProjectPath { get; set; } = null!;

    public string ConnectStr { get; set; } = null!;

    public bool Status { get; set; }

    public bool FromTmpTable { get; set; }

    /// <summary>
    /// 建檔人員
    /// </summary>
    public string? Creator { get; set; }

    /// <summary>
    /// 建檔日期
    /// </summary>
    public DateTime? Created { get; set; }

    /// <summary>
    /// 修改人員
    /// </summary>
    public string? Reviser { get; set; }

    /// <summary>
    /// 修改日期
    /// </summary>
    public DateTime? Revised { get; set; }
}
