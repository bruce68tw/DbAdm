using Base.Enums;
using Base.Services;
using DbAdm.Enums;
using DbAdm.Tables;

namespace DbAdm.Services
{
    public class GenCrudUiSvc
    {
        private string Sep = "," + _Fun.TextCarrier;

        public string DownTableSql(string crudId)
        {
            var db = _Xp.GetDb();
            var crud = db.Crud.FirstOrDefault(a => a.Id == crudId)!;
            var allItems = db.CrudUiItem
                .Where(a => a.CrudId == crudId)
                .OrderBy(a => a.BoxId).ThenBy(a => a.Sort)
                .ToList();

            //main table
            var mainItems = allItems.Where(a => a.BoxId == "0" && a.ItemType != UiItemTypeEstr.Table)
                .ToList();
            var mainSql = "";
            foreach (var item in mainItems)
            {
                if (item.ItemType == UiItemTypeEstr.Input)
                    mainSql += _Str.Tab(1) + GetInputSql(item.Info) + Sep;
                else if (item.ItemType == UiItemTypeEstr.RowBox)
                {
                    var items = allItems
                        .Where(a => a.BoxId == item.Id && a.ItemType == UiItemTypeEstr.Input)
                        .OrderBy(a => a.ChildNo).ThenBy(a => a.Sort)
                        .ToList();
                    if (items.Count > 0)
                        mainSql += GetInputListSql(items) + Sep;
                }
                else if (item.ItemType == UiItemTypeEstr.Checks)
                {
                    var info = _Str.ToJson(item.Info)!;
                    var fids = info["LabelFids"]!.ToString().Replace(" ", "").Split(',');
                    for (var i = 0; i < fids.Length; i += 2)
                    {
                        mainSql += _Str.Tab(1) + $"{fids[i+1]} bit not null default 0" + Sep;
                    }
                }
            }

            mainSql = $@"
CREATE TABLE {crud.ProgCode} (
{mainSql[..^Sep.Length]}
);";

            //child tables
            var tables = allItems.Where(a => a.BoxId == "0" && a.ItemType == UiItemTypeEstr.Table)
                .ToList();
            foreach (var table in tables)
            {
                //var tableSql = "";
                var items = allItems
                    .Where(a => a.BoxId == table.Id && a.ItemType == UiItemTypeEstr.Input)
                    .OrderBy(a => a.ChildNo).ThenBy(a => a.Sort)
                    .ToList();
                if (items.Count > 0)
                {
                    var info = _Str.ToJson(table.Info)!;
                    mainSql += $@"
CREATE TABLE {info["Code"]!.ToString()} (
{GetInputListSql(items)}
);" + _Fun.TextCarrier;
                }
            }

            return mainSql;
        }

        //(rescursive)
        private string GetChildSql(string tableCode, List<CrudUiItem> items)
        {
            //var sep = "," + _Fun.TextCarrier;
            var result = "";
            foreach (var item in items)
            {
                result += _Str.Tab(1) + GetInputSql(item.Info) + Sep;
            }
            return result[..^Sep.Length];
        }

        private string GetInputListSql(List<CrudUiItem> items)
        {
            var result = "";
            foreach (var item in items)
            {
                result += _Str.Tab(1) + GetInputSql(item.Info) + Sep;
            }
            return result[..^Sep.Length];
        }

        private string GetInputSql(string infoStr)
        {
            var info = _Str.ToJson(infoStr)!;
            var fid = info["Fid"]!.ToString();
            var req = _Var.ToBool(info["Required"]) ? "not null" : "null";
            var inputType = info["InputType"]!.ToString();
            var dataType = (info["DataType"] == null) ? "" : info["DataType"]!.ToString();
            if (dataType == "")
            {
                //使用 99 表示未確定!!
                dataType = inputType switch
                {
                    InputTypeEstr.Text => "varchar(99)",
                    InputTypeEstr.Check => "bit not null default 0",
                    InputTypeEstr.Date => "smalldatetime",
                    InputTypeEstr.Decimal => "numeric(9, 1)",
                    InputTypeEstr.File => "nvarchar(99)",
                    InputTypeEstr.Html => "nvarchar(99)",
                    InputTypeEstr.Integer => "int",
                    InputTypeEstr.Radio => "varchar(99)",
                    InputTypeEstr.Read => "varchar(99)",
                    InputTypeEstr.Select => "varchar(99)",
                    InputTypeEstr.Textarea => "varchar(99)",
                    _ => "varchar(99)",
                };
            }

            return (inputType == InputTypeEstr.Check)
                ? $"{fid} {dataType}"
                : $"{fid} {dataType} {req}";
        }

    }//class
}