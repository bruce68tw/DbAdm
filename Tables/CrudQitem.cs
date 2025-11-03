using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class CrudQitem
{
    public int Sn { get; set; }

    public string Id { get; set; } = null!;

    public string CrudId { get; set; } = null!;

    public string? Fid { get; set; }

    public string? Name { get; set; }

    public string? DataType { get; set; }

    public string TableAs { get; set; } = null!;

    public string InputType { get; set; } = null!;

    public string? ItemData { get; set; }

    public string Op { get; set; } = null!;

    public bool IsRange { get; set; }

    public bool IsFind2 { get; set; }

    public string? PosGroup { get; set; }

    public string? LayoutCols { get; set; }

    public int Sort { get; set; }

    /// <summary>
    /// 改用 InputType
    /// </summary>
    public string? zz_QitemType { get; set; }

    public string? ColumnId { get; set; }
}
