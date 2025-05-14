using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class CrudQitem
{
    public int Sn { get; set; }

    public string Id { get; set; } = null!;

    public string CrudId { get; set; } = null!;

    public string ColumnId { get; set; } = null!;

    public string TableAs { get; set; } = null!;

    public string QitemType { get; set; } = null!;

    public string? ItemData { get; set; }

    public string Op { get; set; } = null!;

    public bool IsRange { get; set; }

    public bool IsFind2 { get; set; }

    public string? PosGroup { get; set; }

    public string? LayoutCols { get; set; }

    public int Sort { get; set; }
}
