using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class IssueRelat
{
    public int Sn { get; set; }

    public string Id { get; set; } = null!;

    public string IssueId { get; set; } = null!;

    public string SourceIssue { get; set; } = null!;

    public string Creator { get; set; } = null!;

    public DateTime Created { get; set; }
}
