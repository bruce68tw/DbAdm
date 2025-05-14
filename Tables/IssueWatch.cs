using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class IssueWatch
{
    public int Sn { get; set; }

    public string Id { get; set; } = null!;

    public string IssueId { get; set; } = null!;

    public string WatcherId { get; set; } = null!;
}
