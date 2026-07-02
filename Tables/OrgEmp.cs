using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class OrgEmp
{
    public string Id { get; set; } = null!;

    public string Idno { get; set; } = null!;

    public string EmpNo { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string DeptId { get; set; } = null!;

    public string DeptNo { get; set; } = null!;

    public byte LevelNo { get; set; }

    public string BankName { get; set; } = null!;

    public string BankAccount { get; set; } = null!;

    /// <summary>
    /// 1:在職
    /// </summary>
    public byte WorkStatus { get; set; }

    public string? ProjectId { get; set; }

    /// <summary>
    /// (暫無使用)1表示薪轉取此筆, 處理同一同工有2個銀行帳號
    /// </summary>
    public bool HrTranStatus { get; set; }

    public string? Note { get; set; }

    public string? OldProjectId { get; set; }
}
