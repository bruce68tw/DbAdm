using System;
using System.Collections.Generic;

namespace DbAdm.Tables;

public partial class UiItem
{
    public int Sn { get; set; }

    public string Id { get; set; } = null!;

    /// <summary>
    /// Ui.Id
    /// </summary>
    public string UiId { get; set; } = null!;

    /// <summary>
    /// 上層容器Id, 0表示最外層
    /// </summary>
    public string BoxId { get; set; } = null!;

    public int ChildNo { get; set; }

    /// <summary>
    /// see XpCode.Type=UiItemType
    /// </summary>
    public string ItemType { get; set; } = null!;

    /// <summary>
    /// Item json 字串
    /// </summary>
    public string Info { get; set; } = null!;

    public int Sort { get; set; }
}
