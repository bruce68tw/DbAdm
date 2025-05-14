using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class Survey
{
    public int Sn { get; set; }

    /// <summary>
    /// 同Issue.Id
    /// </summary>
    public string Id { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public byte Q1 { get; set; }

    public byte Q2 { get; set; }

    public byte Q3 { get; set; }

    public byte Q4 { get; set; }

    public string? Q5 { get; set; }

    public DateTime Created { get; set; }
}
