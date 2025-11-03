using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class CrudRitem
{
    public int Sn { get; set; }

    public string Id { get; set; } = null!;

    public string CrudId { get; set; } = null!;

    /// <summary>
    /// old: ColumnCode
    /// </summary>
    public string Fid { get; set; } = null!;

    public string Name { get; set; } = null!;

    public int Width { get; set; }

    public string RitemType { get; set; } = null!;

    public int Sort { get; set; }
}
