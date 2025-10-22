using Base.Models;
using Base.Services;
using BaseApi.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class UiEdit : BaseEditSvc
    {
        public UiEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto()
            {
                FnWhenSaveA = FnWhenSaveA,
                Table = "dbo.[Ui]",
                PkeyFid = "Id",
                Col4 = ["Creator", "Created"],
                Items = [
                    new() { Fid = "Id" },
                    new() { Fid = "ProjectId" },
                    new() { Fid = "Code" },
                    new() { Fid = "Name" },
                    new() { Fid = "Status", Value = 1 },
                    new() { Fid = "Note" },
                ],
                Childs = [
                    new()
                    {
                        Table = "dbo.UiItem",
                        PkeyFid = "Id",
                        FkeyFid = "UiId",
                        OrderBy = "BoxId, Sort",    //重要 !!
                        Col4 = null,
                        Items = [
                            new() { Fid = "Id" },
                            new() { Fid = "UiId" },
                            new() { Fid = "BoxId" },
                            new() { Fid = "ItemType" },
                            new() { Fid = "ChildNo" },
                            new() { Fid = "Info" },
                            new() { Fid = "Sort" },
                        ],
                    },
                ],
            };
        }

        //delegate function of FnWhenSaveA, 預設為非同步 !!
        //設定uiItem.BoxId
        private async Task<string> FnWhenSaveA(bool isNew, CrudEditSvc crudEditSvc, JObject inputJson, JObject newKeyJson)
        {
            const string BoxId = "BoxId";
            var rows = _Json.GetChildRows(inputJson, 0);
            if (rows == null || rows.Count == 0) return "";

            foreach (JObject row in rows)
            {
                if (row[BoxId] == null) continue;

                var boxIdStr = row[BoxId]!.ToString();
                if (int.TryParse(boxIdStr, out var boxId) && boxId < 0)
                {
                    var find = _Json.FindArray(rows, "_Id2", boxIdStr)!;
                    row[BoxId] = find!["Id"];     //此時Id已經產生
                }
            }
            await Task.CompletedTask;   //模擬 async 結束, 此函數實際為同步!!
            return "";
        }

    } //class
}
