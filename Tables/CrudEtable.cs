using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class CrudEtable
{
    public string Id { get; set; } = null!;

    public string CrudId { get; set; } = null!;

    public string TableId { get; set; } = null!;

    public string PkeyFid { get; set; } = null!;

    public string? FkeyFid { get; set; }

    public string Col4 { get; set; } = null!;

    public string OrderBy { get; set; } = null!;

    public int Sort { get; set; }

    public bool HalfWidth { get; set; }

    public string? AutoIdLen { get; set; }

    public virtual ICollection<CrudEitem> CrudEitem { get; set; } = new List<CrudEitem>();
}
