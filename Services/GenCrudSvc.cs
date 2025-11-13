using Base.Enums;
using Base.Services;
using DbAdm.Enums;
using DbAdm.Models;
using HandlebarsDotNet;
using System.Web;

namespace DbAdm.Services
{
    //generate CRUD, use Handlebars.net
    //可分別產生 Read、Edit, 或全部產生, 使用 EF
    public class GenCrudSvc
    {
        //constant
        const string CommaSep = ", ";       //comma seperator
        const string CrudProg = "[prog]";   //key word inside file name
        const string PosGroup0 = "-abc99";  //impossible value for initial

        //rows for one curdId
        private CrudDto _crud = null!;
        //private bool _isUi = false;

        /*
        private List<CrudQitemDto>? _qitems = null;
        private List<CrudRitemDto>? _ritems = null;
        private List<CrudEtableDto>? _etables = null;
        private List<CrudEitemDto>? _eitems = null;
        */

        //template folder
        private readonly string TplDir = _Fun.DirRoot + "_template/";

        //generated 6 files, 1(template), 2(target folder), 3(target file name)
        private readonly string[] CrudFiles = [
            "Controller.txt", "Controllers", "[prog]Controller.cs",
            "ReadService.txt", "Services", "[prog]Read.cs",
            "EditService.txt", "Services", "[prog]Edit.cs",
            "ReadView.txt", "Views/[prog]", "Read.cshtml",
            "EditView.txt", "Views/[prog]", "Edit.cshtml",
            "JS.txt", "wwwroot/js/view", "[prog].js",
        ];

        //edit view 陣列位置, IsUi=true時使用巢狀結構, base 0
        private readonly int EditViewIdx = 4;


        /// <summary>
        /// 產生Crud程式碼
        /// </summary>
        /// <param name="issueId"></param>
        /// <returns>1(成功), or 錯誤訊息</returns>
        public async Task<string> GenCrudA(string crudId)
        {
            //check input
            if (!_Str.CheckKey(crudId))
                return $"GenCrudSvc.cs GenCrudA() only accept alphabet and numeric: ({crudId})";

            var error = SetCrudDto(crudId);
            if (error == "") 
                error = await GenFilesA();

            return error;
        }

        /// <summary>
        /// generate crud files by one crudId
        /// called by GenCrud()
        /// </summary>
        /// <param name="crudId"></param>
        /// <returns>error msg if any</returns>
        private string SetCrudDto(string crudId)
        {
            //讀取DB
            #region 1.get model variables from EF
            //1.get _cruds(Crud rows) CrudDto from EF
            List<CrudEtableDto>? etables = null;
            List<CrudEitemDto>? eitems = null;
            List<CrudUiItemDto>? uiItems = null;
            var error = "";
            var db = _Xp.GetDb();
            var crud = (from c in db.Crud
                     join p in db.Project on c.ProjectId equals p.Id
                     //join t in db.Table on a.TableId equals t.Id
                     //where crudIds.Contains(c.Id)
                     where c.Id == crudId
                     select new CrudDto()
                     {
                         Id = c.Id,
                         IsUi = c.IsUi,
                         Project = p.Code,
                         ProjectPath = p.ProjectPath,
                         ProgName = c.ProgName,
                         ProgCode = c.ProgCode,
                         TableAs = c.TableAs!,
                         LabelHori = c.LabelHori,
                         ReadSql = c.ReadSql,
                         HasCreate = c.HasCreate,
                         HasUpdate = c.HasUpdate,
                         HasDelete = c.HasDelete,
                         HasView = c.HasView,
                         HasExport = c.HasExport,
                         HasReset = c.HasReset,
                         AuthType0 = (c.AuthType == 0),
                         AuthType1 = (c.AuthType == 1),
                         AuthType2 = (c.AuthType == 2),
                     })
                      .FirstOrDefault();

            if (crud == null)
            {
                error = $"找不到 dbo.Crud for Id={crudId}";
                goto lab_error;
            }

            //set _crud
            _crud = crud;

            //query item
            var qitems = (from q in db.CrudQitem
                          where q.CrudId == crudId
                          orderby q.CrudId, q.Sort
                          select new CrudQitemDto()
                          {
                              CrudId = q.CrudId,
                              Fid = q.Fid!,
                              Name = q.Name!,
                              DataType = q.DataType!,   //for 計算輸入欄位maxLen
                              PosGroup = q.PosGroup!,
                              Cols = q.Cols!,
                              PlaceHolder = "",
                              IsFind2 = q.IsFind2,
                              Op = q.Op,
                              InputType = q.InputType,
                              ItemData = q.ItemData!,
                          })
                       .ToList();

            //2.get _crudRitems(CrudRitem rows) query result fields
            var ritems = (from r in db.CrudRitem
                          where r.CrudId == crudId
                          orderby r.CrudId, r.Sort
                          select new CrudRitemDto()
                          {
                              CrudId = r.CrudId,
                              RitemType = r.RitemType,
                              //ExtInfo = r.ExtInfo,
                              Name = r.Name,
                              Width = r.Width,
                              Fid = r.Fid,
                              //Column = c.Name,
                          })
                       .ToList();

            if (crud.IsUi)
            {
                uiItems = (from e in db.CrudUiItem
                           where e.CrudId == crudId
                           select new CrudUiItemDto()
                           {
                               Id = e.Id,
                               CrudId = e.CrudId,
                               BoxId = e.BoxId,
                               ChildNo = e.ChildNo,
                               ItemType = e.ItemType,
                               Info = e.Info,
                               Sort = e.Sort,
                           })
                           .OrderBy(a => a.BoxId).ThenBy(a => a.Sort)
                           .ToList();
                _crud.UiItems = uiItems;
            }
            else
            {
                //3.get _crudEtable(CrudEtable rows)
                etables = (from e in db.CrudEtable
                           join t in db.Table on e.TableId equals t.Id
                           where e.CrudId == crudId
                           select new CrudEtableDto()
                           {
                               Id = e.Id,
                               //CrudId = e.CrudId,
                               TableCode = t.Code,
                               TableName = t.Name,
                               PkeyFid = e.PkeyFid,
                               FkeyFid = e.FkeyFid!,
                               AutoIdLen = e.AutoIdLen ?? "",
                               HasCol4 = (e.Col4 == "1"),
                               HalfWidth = e.HalfWidth,
                               OrderBy = e.OrderBy,
                           })
                            .ToList();

                //4.get _crudEitem(CrudEitem rows)
                eitems = (from e in db.CrudEitem
                          join t in db.CrudEtable on e.EtableId equals t.Id
                          join c in db.Column on e.ColumnId equals c.Id
                          where t.CrudId == crudId
                          select new CrudEitemDto()
                          {
                              EtableId = t.Id,
                              Fid = c.Fid,
                              Name = c.Name,
                              DataType = c.DataType,
                              Required = e.Required,
                              HasCreate = e.HasCreate,
                              HasUpdate = e.HasUpdate,
                              CheckType = e.CheckType,
                              CheckData = e.CheckData!,
                              InputType = e.InputType,
                              ItemData = e.ItemData!,
                              PosGroup = e.PosGroup!,
                              Cols = e.Cols!,
                              PlaceHolder = e.PlaceHolder!,
                              Sort = e.Sort,
                              Width = e.Width,
                          })
                           //.OrderBy(a => new { a.EtableId, a.Sort })  //.net core not support !!
                           .OrderBy(a => a.EtableId).ThenBy(a => a.Sort)
                           .ToList();
            }

            db.Dispose();
            #endregion

            //處理資料 for isUi=true
            if (_crud.IsUi)
            {
                #region uiItems -> etables
                etables = [];
                eitems = [];

                //add main table & eitems
                UiItemToEtable(etables, eitems, uiItems!, _crud.ProgCode, _crud.ProgName, "0", "");

                //add child tables & eitems
                foreach (var uiItem in uiItems!
                    .Where(a => a.ItemType == UiItemTypeEstr.Table)
                    .OrderBy(a => a.Sort)
                    .ToList())
                {
                    //add child table
                    var info = _Str.ToJson(uiItem.Info)!;
                    UiItemToEtable(etables, eitems, uiItems!, info["Code"]!.ToString(), 
                        info["Name"]!.ToString(), uiItem.Id, info["FkeyFid"]!.ToString());
                }
                #endregion

                #region uiItems 在 Edit View 多了 GroupText、Checks、Row Col容器(放多個child)
                #endregion
            }

            #region 2.set fields: crud.RsItemStrs && IsGroup, IsGroupStart, IsGroupEnd
            //dropdown list types
            //var error = "";
            var ddlpTypes = new List<string>() { InputTypeEstr.Select, InputTypeEstr.Radio };
            var qitemLen = (qitems == null) ? 0 : qitems.Count;
            int i;
            if (qitemLen > 0)
            {
                var rsItemStrs = new List<String>();
                var posGroup = PosGroup0;   //initial value, get one impossible value for avoid repeat
                for (i = 0; i < qitemLen; i++)
                {
                    //set rSitemStrs
                    var qitem = qitems![i];
                    rsItemStrs.Add(RSvcQitemStr(qitem));

                    //set IsGroup, IsGroupStart, IsGroupEnd
                    if (_Str.NotEmpty(qitem.PosGroup))
                    {
                        qitem.IsGroupStart = (qitem.PosGroup != posGroup);
                        qitem.IsGroup = qitem.IsGroupStart || (qitem.PosGroup == posGroup);
                        qitem.IsGroupEnd = !qitem.IsGroup ? false :
                            (i + 1 == qitemLen) ? true :
                            (qitems[i + 1].PosGroup != posGroup);

                        //for next loop
                        posGroup = qitem.PosGroup;
                    }

                    //fitem.RvStr = GetViewItemStr(fitem);  //set after XgFindTbar
                }
                _crud.RsItemStrs = rsItemStrs;
                _crud.HasFitemCols = qitems!.Any(a => _Str.IsEmpty(a.Cols));

                //set ReadSelectCols, be [] when null !!
                //字尾A表示非同步
                _crud.ReadSelectCols = qitems!
                    .Where(a => ddlpTypes.Contains(a.InputType))
                    .Select(a => (a.ItemData.Length > 0 && a.ItemData[^1] == 'A')
                        ? $"ViewBag.{a.ItemData[..^1]} = await _XpCode.{a.ItemData}();"
                        : $"ViewBag.{a.ItemData} = _XpCode.{a.ItemData}();")
                    .Distinct()
                    .ToList();

                #region 4.set fields: EditSelectCols(ReadSelectCols already done)
                //排除qitems
                var qitemDatas = qitems!.Select(a => a.ItemData)
                    .ToList() ?? [];
                //eitem select 欄位設定 ViewBag 資料來源
                var editSelectCols = eitems!
                    .Where(a => ddlpTypes.Contains(a.InputType) &&
                        !qitemDatas.Contains(a.ItemData))
                    .Select(a => (a.ItemData.Length > 0 && a.ItemData[^1] == 'A')
                        ? $"ViewBag.{a.ItemData[..^1]} = await _XpCode.{a.ItemData}();"
                        : $"ViewBag.{a.ItemData} = _XpCode.{a.ItemData}();")
                    .Distinct()
                    .ToList();
                if (editSelectCols != null)
                    _crud.ReadSelectCols.AddRange(editSelectCols);

                //crud.HasSelectA = (crud.ReadSelectCols.Count > 0 || crud.EditSelectCols.Count > 0);
                var asyncCount = _crud.ReadSelectCols.Count(a => a.Contains("await"));
                _crud.HasSelectA = asyncCount > 0;

                //加上 Db
                if (asyncCount > 1)
                {
                    var items = _crud.ReadSelectCols;
                    for (i = 0; i < items.Count; i++)
                    {
                        if (items[i].Contains("await"))
                            items[i] = items[i].Replace("()", "(db)");
                    }
                    _crud.ReadSelectCols.Insert(0, "var db = new Db();");
                    _crud.ReadSelectCols.Add("await db.DisposeAsync();");
                }
                #endregion

                //set Fitems, F2items
                var find2Pos = qitems!.FindIndex(a => a.IsFind2);
                var hasFind2 = (find2Pos > 0);    //must > 0
                _crud.HasFindForm = true;
                _crud.HasFind2Form = hasFind2;

                //split qitems to qitems2
                if (hasFind2)
                {
                    var qitems2 = new List<CrudQitemDto>();
                    var q2Len = qitemLen - find2Pos;
                    qitems2.AddRange(qitems.GetRange(find2Pos, q2Len));
                    qitems.RemoveRange(find2Pos, q2Len);
                    _crud.Qitems2 = qitems2;
                    qitemLen -= find2Pos;    //adjust

                    //set RvStr
                    foreach (var qitem2 in qitems2)
                        qitem2.RvStr = ViewItemStr(etables![0], qitem2);
                }

                //adjust: fitems row 1 add toolbar buttons
                posGroup = qitems[0].PosGroup;
                //find group 1 last row for write toolbar
                int pos;
                if (_Str.IsEmpty(posGroup))
                {
                    pos = 0;
                    qitems[pos].IsGroup = true;
                    qitems[pos].IsGroupStart = true;
                    qitems[pos].IsGroupEnd = false;
                }
                else
                {
                    pos = qitems.FindIndex(a => a.PosGroup != posGroup);
                    pos = (pos < 0) ? qitemLen - 1 : pos - 1;
                    qitems[pos].IsGroup = true;
                    qitems[pos].IsGroupStart = false;
                    qitems[pos].IsGroupEnd = false;
                }
                //set RvStr first
                foreach (var fitem in qitems)
                    fitem.RvStr = ViewItemStr(etables![0], fitem);

                qitems.Insert(pos + 1, new CrudQitemDto()
                {
                    RvStr = CompStart("XgFindTbar") +
                        ColsToStr(
                            ViewBool("IsHori", _crud.LabelHori, false),
                            ViewBool("HasReset", _crud.HasReset, true),
                            ViewBool("HasFind2", hasFind2, true)) +
                        CompEnd(),

                    IsGroupStart = false,
                    IsGroupEnd = true,
                    IsGroup = true,
                });
                _crud.Qitems = qitems;
            }
            else
            {
                //be [] when null for easy coding !!
                _crud.ReadSelectCols = new List<string>();
            }
            #endregion

            #region 3.set fields: crud.Ritems, crud.JsColDefStrs
            //set ritems(result items)
            var hasRitem = (ritems != null && ritems.Count > 0);
            if (hasRitem)
            {
                //array len are different, seperate to 2 arrays
                var jsStrs = new List<string>();  //part fields for js
                var ritemLen = ritems!.Count;
                for (i = 0; i < ritemLen; i++)
                {
                    var ritem = ritems[i];
                    ritem.ViewStr = RViewHeadStr(ritem);

                    var jsStr = JsRitemUdColStr(_crud, ritem, i);
                    if (jsStr != "")
                        jsStrs.Add(jsStr);
                }

                /*
                //add crudFun if need
                if (crud.HasCreate || crud.HasUpdate || crud.HasDelete)
                {
                    var ritem = new CrudRitemDto()
                    {
                        RitemType = RitemTypeEstr.CrudFun,
                        Width = 100,
                        Name = "維護",
                    };
                    ritems.Add(new CrudRitemDto()
                    {
                        ViewStr = GetRViewHeadStr(ritem)
                    });

                    jsStrs.Add(GetJsColDefStr(crud, ritem, ritemLen));
                }
                */

                _crud.Ritems = ritems;
                _crud.JsColDefStrs = jsStrs;
            }
            #endregion

            #region 4.set fields: crud.MainTable, crud.ChildTables
            //set etable.Eitems
            var etableLen = etables!.Count;
            for (i = 0; i < etableLen; i++)
            {
                var etable = etables[i];
                var eitems2 = eitems!.Where(a => a.EtableId == etable.Id).ToList();
                etable.Eitems = eitems2;

                var posGroup = PosGroup0;   //set impossible init value
                var eitemLen = eitems2.Count;
                var isTable = (i > 0);
                for (var j = 0; j < eitemLen; j++)
                {
                    var eitem = eitems2[j];
                    eitem.ServiceStr = ESvcEitemStr(eitem);
                    eitem.ViewStr = ViewItemStr(etable, eitem, isTable);

                    //add hide field string for modal input(textArea)
                    if (eitem.InputType == InputTypeEstr.Modal)
                        AddHideStr(etable, eitem);

                    //child table set table header
                    if (i > 0)
                        eitem.HeadStr = EViewHeadStr(eitem);

                    //set posGroup related
                    if (_Str.IsEmpty(eitem.PosGroup))
                        continue;

                    eitem.IsGroupStart = (eitem.PosGroup != posGroup);
                    eitem.IsGroup = eitem.IsGroupStart || (eitem.PosGroup == posGroup);
                    eitem.IsGroupEnd = !eitem.IsGroup ? false :
                        (j + 1 == eitemLen) ? true :
                        (eitems2[j + 1].PosGroup != eitem.PosGroup);
                    posGroup = eitem.PosGroup;
                }
            }
            _crud.MainTable = etables[0];

            //set ChildTables & ManyTables
            if (etableLen > 1)
            {
                //set ChildTables
                _crud.ChildTables = [];
                var childTables = _crud.ChildTables;
                for (i = 1; i < etableLen; i++)
                {
                    //at end, add row function component(delete/deleteUpDown)
                    var table = etables[i];
                    table.Sort = i - 1;     //base 0
                    table.SortFid = table.Eitems
                        .Where(a => a.InputType == InputTypeEstr.Sort)
                        .Select(a => a.Fid)
                        .FirstOrDefault()!;
                    table.Eitems.Add(new CrudEitemDto()
                    {
                        HeadStr = "<th></th>",
                        //@await Component.InvokeAsync("XgDeleteRow", "_me.mCol.onDeleteRow(this)")
                        ViewStr = _Str.IsEmpty(table.SortFid)
                            ? "<td class='text-center x-w60'>@await Component.InvokeAsync(\"XgDeleteRow\", \"_me.m" + table.TableCode + ".onDeleteRow\")</td>"
                            : "<td class='text-center x-w100'>@await Component.InvokeAsync(\"XgDeleteUpDown\", new { mName = \"_me.m" + table.TableCode + "\" })</td>",
                    });
                    childTables.Add(table);
                }

                //ManyTables
                _crud.ManyTables = string.Join(", ", _crud.ChildTables
                    .Select(a => "_me.m" + a.TableCode)
                    .ToList());
            }
            #endregion

            #region 5.File field
            //set crud.HasFile
            var files = etables.SelectMany(a => a.Eitems)
                .Where(a => a.InputType == InputTypeEstr.File)
                .ToList();
            //crud.HasFile = etables.SelectMany(a => a.Eitems).Any(b => b.ItemType == InputTypeEstr.File);
            _crud.HasFile = (files != null && files.Count > 0);
            if (_crud.HasFile)
            {
                //FileType0, FileType1
                var mainTableId = _crud.MainTable.Id;
                _crud.FileType1 = files!.Any(a => a.EtableId != mainTableId);
                _crud.FileType0 = !_crud.FileType1;

                //FileEditArg, FileEditTypeArg, FileEditStrs
                if (_crud.FileType0)
                {
                    var file = files!.First(a => a.EtableId == mainTableId);
                    var fid2 = $"t0_{file.Fid}";
                    _crud.FileEditArg = fid2;
                    _crud.FileEditTypeArg = $"IFormFile {_crud.FileEditArg}";
                    _crud.FileEditStrs =
                    [
                        $"await _HttpFile.SaveCrudFileA(json, service.GetNewKeyJson(), _Xp.Dir{_crud.ProgCode}, {fid2}, nameof({fid2}));"
                    ];
                }
                else
                {
                    _crud.FileEditArg = "";
                    _crud.FileEditTypeArg = "";
                    _crud.FileEditStrs = [];
                    var sep = "";
                    foreach (var file in files!)
                    {
                        if (file.EtableId == mainTableId)
                        {
                            var fid2 = $"t0_{file.Fid}";
                            _crud.FileEditArg += sep + fid2;
                            _crud.FileEditTypeArg += sep + $"IFormFile {fid2}";
                            _crud.FileEditStrs.Add($"await _HttpFile.SaveCrudFileA(json, service.GetNewKeyJson(), _Xp.Dir{_crud.ProgCode}, {fid2}, nameof({fid2}));");
                        }
                        else
                        {
                            var etable = _crud.ChildTables!.First(a => a.Id == file.EtableId);
                            var fid2 = $"t0{etable.Sort}_{file.Fid}";
                            _crud.FileEditArg += sep + fid2;
                            _crud.FileEditTypeArg += sep + $"List<IFormFile> {fid2}";
                            _crud.FileEditStrs.Add($"await _HttpFile.SaveCrudFilesA(json, service.GetNewKeyJson(), _Xp.Dir{etable.TableCode}, {fid2}, nameof({fid2}));");
                        }
                        sep = ", ";
                    }
                }
            }
            #endregion
            return "";

        lab_error:
            return "GenCrudSvc.cs SetCrudDto() error: " + error;
        }

        /**
         * uiItem to etable & eitem
         * called by SetCrudDto -> GenCrud
         * param boxId {string} Table ItemType 的Id, 用來找到 child ItemType(input)
         */ 
        private void UiItemToEtable(List<CrudEtableDto> etables, List<CrudEitemDto> eitems, List<CrudUiItemDto> uiItems, 
            string tableCode, string tableName, string boxId, string fkeyFid)
        {
            var tableId = _Str.NewId(); //for 對應新的 Eitem
            etables.Add(new CrudEtableDto()
            {
                Id = tableId,
                //CrudId = _crud.Id,
                TableCode = tableCode,
                TableName = tableName,
                PkeyFid = "Id",
                FkeyFid = fkeyFid,
                //AutoIdLen = e.AutoIdLen ?? "",
                //HasCol4 = (e.Col4 == "1"),
                //HalfWidth = e.HalfWidth,
                //OrderBy = e.OrderBy,
            });

            //add main table eitems, 這裡不處理 Group type
            //var boxId = "0";
            var types = new List<string>() { UiItemTypeEstr.Input, UiItemTypeEstr.Checks };
            foreach (var uiItem in uiItems!
                .Where(a => a.BoxId == boxId)
                .Where(a => types.Contains(a.ItemType))
                .OrderBy(a => a.Sort)
                .ToList())
            {
                //add child table
                var info = _Str.ToJson(uiItem.Info)!;

                //考慮不同的 inputType
                if (uiItem.ItemType == UiItemTypeEstr.Checks)
                {
                    //Checks 的情形
                    //LabelFids to input list
                    var fids = info["LabelFids"]!.ToString().Replace(" ", "").Split(',');
                    for (var i = 0; i < fids.Length; i += 2)
                    {
                        eitems.Add(new CrudEitemDto()
                        {
                            EtableId = tableId,
                            Fid = fids[i + 1]!.ToString(),
                            Name = fids[i]!.ToString(),
                            //DataType = info["MaxLen"]!.ToString(),
                            //Required = (info["Required"]!.ToString() == "1"),
                            HasCreate = true,
                            HasUpdate = true,
                            //CheckType = e.CheckType,
                            //CheckData = e.CheckData!,
                            InputType = InputTypeEstr.Check,
                            //ItemData = e.ItemData!,
                            //PosGroup = e.PosGroup!,
                            Cols = info["Cols"]!.ToString(),
                            //PlaceHolder = e.PlaceHolder!,
                            Sort = uiItem.Sort,
                            //Width = e.Width,
                        });
                    }
                }
                else
                { 
                    //一般 Input
                    //var tableId = _Str.NewId();
                    eitems.Add(new CrudEitemDto()
                    {
                        EtableId = tableId,
                        Fid = info["Fid"]!.ToString(),
                        Name = info["Title"]!.ToString(),
                        DataType = (info["MaxLen"] == null) ? "" : info["MaxLen"]!.ToString(),
                        Required = _Var.ToBool(info["Required"]),
                        HasCreate = true,
                        HasUpdate = true,
                        //CheckType = e.CheckType,
                        //CheckData = e.CheckData!,
                        InputType = info["InputType"]!.ToString(),
                        //ItemData = e.ItemData!,
                        //PosGroup = e.PosGroup!,
                        Cols = (info["Cols"] == null) ? "" : info["Cols"]!.ToString(),
                        //PlaceHolder = e.PlaceHolder!,
                        Sort = uiItem.Sort,
                        //Width = e.Width,
                    });
                }
            }
        }

        private async Task<string> GenFilesA()
        {
            //generate crud files
            var error = "";
            var isManyEdit = (_crud.ChildTables != null && _crud.ChildTables.Count > 1);
            var projectPath = _Str.AddDirSep(_crud.ProjectPath);
            var eviewPos = EditViewIdx * 3;
            for (var i = 0; i < CrudFiles.Length; i += 3)
            {
                #region 6.read template file to string
                var tplFile = TplDir + CrudFiles[i];
                var tplStr = await _File.ToStrA(tplFile);
                if (tplStr == null)
                {
                    error = "no template file: " + tplFile + "," + "??";
                    goto lab_error;
                }
                #endregion

                //7.template string replace by Handlebars
                //如果 _crud.IsUi, 則EditView 則使用巢狀結構來建立
                var result = "";
                if (_crud.IsUi && i == eviewPos)
                {
                    /*
                    //在模板中使用 ifEq
                    Handlebars.RegisterHelper("ifEq", (writer, context, args) =>
                    {
                        var left = args[0]?.ToString();
                        var right = args[1]?.ToString();
                        if (left == right)
                            writer.WriteSafeString(args[2]);
                        else if (args.Length > 3)
                            writer.WriteSafeString(args[3]);
                    });
                    */
                    //
                    //Handlebars.RegisterTemplate("UiBox", noteTemplate); //註冊UiBox(recursive node)

                    result = GetUiEditView("0", 0);
                    _crud.MainTable.CustEview = result;
                }
                var handleTpl = Handlebars.Compile(tplStr);
                result = HttpUtility.HtmlDecode(handleTpl(_crud));

                #region 8.rename existed target file if need
                var tableCode = _crud.ProgCode;
                var toDir = projectPath + _Str.AddDirSep(CrudFiles[i + 1]).Replace(CrudProg, tableCode);
                var toFile = toDir + CrudFiles[i + 2].Replace(CrudProg, tableCode);
                //var toFile = _File.GetNextFileName(toDir + _crudFiles[i + 2].Replace(CrudTable, tableName), true);
                if (File.Exists(toFile))
                    File.Copy(toFile, _File.GetNextFileName(toFile, true));
                #endregion 
                
                //9.save result string to file
                _File.MakeDir(toDir);   //create folder when need
                await _File.StrToFileA(result, toFile);
            }//for

            //case of ok
            return "";

        lab_error:
            return "GenCrudSvc.cs GenFilesA() error: " + error;
            //return false;
        }

        /**
         * (recursive)產生 edit view(only main table) for Ui
         */ 
        private string GetUiEditView(string boxId, int childNo)
        {
            //skip Table
            var result = "";
            var uiItems = _crud.UiItems!;
            foreach (var uiItem in uiItems!
                .Where(a => a.BoxId == boxId && a.ChildNo == childNo)
                .Where(a => a.ItemType != UiItemTypeEstr.Table)
                .OrderBy(a => a.Sort)
                .ToList())
            {
                var itemStr = "";
                var info = _Str.ToJson(uiItem.Info)!;
                var colStr = "";
                string[]? cols = null;
                switch (uiItem.ItemType)
                {
                    case UiItemTypeEstr.RowBox:
                        //var colLen = int.Parse(info["ColLen"]!.ToString());
                        colStr = "";
                        cols = info["RowType"]!.ToString().Split(',');  //欄位格數list string
                        for (var i=0; i<cols.Length; i++)
                        {
                            //recursive
                            var itemStr2 = GetUiEditView(uiItem.Id, i);
                            colStr += $"<div class='col-md-{cols[i]}'>{itemStr2}</div>" + _Fun.TextCarrier;
                        }
                        itemStr += $"<div class='row'>{colStr}</div>" + _Fun.TextCarrier;
                        break;

                    case UiItemTypeEstr.Checks:
                        var fids = info["LabelFids"]!.ToString().Split(',');
                        colStr = "";
                        cols = info["Cols"]!.ToString().Split(',');
                        for (var i = 0; i < fids.Length; i += 2)
                        {
                            //escape: {{ 和 \"
                            colStr += $"<vc:xi-check dto='new() {{ Fid = \"{fids[i + 1]}\", Label = \"{fids[i]}\" }}'/>" + _Fun.TextCarrier;
                        }

                        var cls = (info["IsHori"]!.ToString() == "1") ? "x-hbox" : "x-vbox";
                        itemStr += $@"
<div class='row'>
    <div class='col-md-{cols[0]} x-label'>{info["Title"]!.ToString()}</div>
    <div class='col-md-{cols[1]} x-input {cls}' >
	    {colStr}
    </div>
</div>
";
                        break;
                    case UiItemTypeEstr.Group:
                        var title = info["Title"]!.ToString();
                        itemStr = $"<vc:xg-group label=\"{title}\" icon=\"false\" />" + _Fun.TextCarrier;
                        break;
                    default:
                        //input
                        var itemDto = new CrudQEitemDto();
                        _Json.CopyToModel(info, itemDto);                        
                        itemDto.Name = info["Title"]!.ToString();   //name -> title 
                        itemStr += ViewItemStr(null, itemDto) + _Fun.TextCarrier;
                        break;
                }

                result += itemStr;
            }
            return result;
        }

        #region get item string
        /// <summary>
        /// get js ritem column string for user defined(ritem)
        /// </summary>
        /// <returns></returns>
        private string JsRitemUdColStr(CrudDto crud, CrudRitemDto ritem, int i)
        {
            var str = "";
            switch (ritem.RitemType)
            {
                case RitemTypeEstr.Normal:
                    return "";

                case RitemTypeEstr.CrudFun:   //escape { -> {{
                    //var ext = ritem.ExtInfo;
                    //align column
                    str = string.Format(@"{{ targets: [{0}], render: function (data, type, full, meta) {{
                    return _me.crudR.dtCrudFun(full.Id, full.Name, {1}, {2}, {3});
                }}}},", i, BoolToStr(crud.HasUpdate), BoolToStr(crud.HasDelete), BoolToStr(crud.HasView));
                    //", i, SubToBool(ext, 0), SubToBool(ext, 1), SubToBool(ext, 2));
                    break;

                case RitemTypeEstr.YesEmpty:
                    str = string.Format(@"{{ targets: [{0}], render: function (data, type, full, meta) {{
                    return _me.crudR.dtYesEmpty(data);
                }}}},", i);
                    break;

                case RitemTypeEstr.StatusName:
                    str = string.Format(@"{{ targets: [{0}], render: function (data, type, full, meta) {{
                    return _me.crudR.dtStatusName(data);
                }}}},", i);
                    break;

                case RitemTypeEstr.SetStatus:
                    str = string.Format(@"{{ targets: [{0}], render: function (data, type, full, meta) {{
                    return _me.crudR.dtSetStatus(full.Id, data);
                }}}},", i);
                    break;

                case RitemTypeEstr.UserDefined:
                    str = string.Format(@"{{ targets: [{0}], render: function (data, type, full, meta) {{
                    //TODO: add your code
                    return '';
                }}}},", i);
                    break;

                    //default:
                    //    continue;
            }
            return str;
        }

        /// <summary>
        /// get result view header string for view
        /// </summary>
        /// <returns></returns>
        private string RViewHeadStr(CrudRitemDto item)
        {
            return "<th" + (item.Width == 0 ? ">" : " width='" + item.Width + "px'>") +
                item.Name + 
                "</th>";
        }

        /// <summary>
        /// get edit service item string, skip empty item
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private string ESvcEitemStr(CrudEitemDto item)
        {
            if (_Str.IsEmpty(item.Fid))
                return "";

            return "new() { " +
                KeyValue("Fid", item.Fid, true) +
                SvcFid("Required", item.Required ? "true" : "") +
                SvcFid("Create", !item.HasCreate ? "false" : "") +
                SvcFid("Update", !item.HasUpdate ? "false" : "") +
                SvcFid("CheckType", CheckTypeName(item.CheckType)) +
                SvcFid("CheckData", item.CheckData, true) +
                " },";
        }

        /// <summary>
        /// get read service item string
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private string RSvcQitemStr(CrudQitemDto item)
        {
            return "new() { " +
                KeyValue("Fid", item.Fid, true) +
                SvcFid("Op", QitemOpName(item.Op)) +
                " },";
        }

        /// <summary>
        /// add hidden field
        /// </summary>
        /// <param name="table"></param>
        /// <param name="item"></param>
        private void AddHideStr(CrudEtableDto table, CrudQEitemDto item)
        {
            table.HideViewStrs ??= [];
            table.HideViewStrs.Add(ViewHide(item.Fid));
        }

        /// <summary>
        /// get hide item string for edit view
        /// </summary>
        /// <param name="fid"></param>
        /// <returns></returns>
        private string ViewHide(string fid)
        {
            return CompStart("XiHide") +
                KeyValue("Fid", fid, true) +
                CompEnd();
        }

        /// <summary>
        /// get view item(eitem/qitem) string
        /// </summary>
        /// <param name="table">for Sort欄位 only</param>
        /// <param name="item"></param>
        /// <param name="isMany"></param>
        /// <returns></returns>
        private string ViewItemStr(CrudEtableDto? table, CrudQEitemDto item, bool isMany = false)
        {
            var center = false;
            var name = isMany ? "" : item.Name;
            string str;
            switch (item.InputType)
            {
                case InputTypeEstr.Hide:
                case InputTypeEstr.Sort:
                    //no need consider in table or not
                    AddHideStr(table!, item);
                    return "";

                case InputTypeEstr.Text:
                case InputTypeEstr.Textarea:
                case InputTypeEstr.Password:
                    var compType = (item.InputType == InputTypeEstr.Textarea) 
                        ? "XiTextarea" : "XiText";
                    str = CompStart(compType) + 
                        ColsToStr(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            (item.InputType == InputTypeEstr.Password) ? KeyValue("IsPwd", "true") : "",
                            ViewMaxLen(item.DataType),
                            ViewRequired(item.Required),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.Cols)) +
                        CompEnd();
                    break;

                case InputTypeEstr.Html:
                    str = CompStart("XiHtml") +
                        ColsToStr(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            //ViewMaxLen(item.DataType),
                            ViewRequired(item.Required),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.Cols)) +
                        CompEnd();
                    break;

                case InputTypeEstr.Integer:
                case InputTypeEstr.Decimal:
                    var type2 = (item.InputType == InputTypeEstr.Integer)
                        ? "XiInt" : "XiDec";
                    str = CompStart(type2) +
                        ColsToStr(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            ViewRequired(item.Required),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.Cols)) +
                            //TODO: add min/max if need
                        CompEnd();
                    break;

                case InputTypeEstr.Check:
                    center = true;
                    str = CompStart("XiCheck") + 
                        ColsToStr(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            //KeyValue("value", "1", true),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.Cols),
                            ViewLabel(item.ItemData)) +
                        CompEnd();
                    break;

                case InputTypeEstr.Radio:
                    center = true;
                    str = CompStart("XiRadio") +
                        ColsToStr(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            ViewSelectRows(item),
                            //KeyValue("value", "1", true),
                            ViewLayout(isMany, item.Cols),
                            ViewInRow(item.IsGroup)) +
                        CompEnd();
                    break;

                case InputTypeEstr.Date:
                    str = CompStart("XiDate") +
                        ColsToStr(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            ViewRequired(item.Required),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.Cols)) +
                        CompEnd();
                    break;

                case InputTypeEstr.DateTime:
                    str = CompStart("XiDt") +
                        ColsToStr(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            ViewRequired(item.Required),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.Cols)) +
                        CompEnd();
                    break;

                case InputTypeEstr.Select:
                    str = CompStart("XiSelect") + 
                        ColsToStr(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            ViewSelectRows(item),
                            ViewRequired(item.Required),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.Cols)) +
                        CompEnd();
                    break;

                case InputTypeEstr.File:
                    str = CompStart("XiFile") + 
                        ColsToStr(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            ViewRequired(item.Required),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.Cols)) +
                        CompEnd();
                    break;

                case InputTypeEstr.Modal:
                    item.Width = 85;
                    center = true;
                    //item.Name for modal title
                    str = CompStart("XgOpenModal") +
                        ColsToStr(
                            ViewTitle(item.Name),
                            ViewFid(item.Fid),
                            ViewMaxLen(item.DataType),
                            ViewRequired(item.Required)) +
                        CompEnd();
                    break;

                case InputTypeEstr.Read:
                    str = CompStart("XiRead") +
                        ColsToStr(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.Cols)) +
                        CompEnd();
                    break;

                //todo: 加上GroupText

                default:
                    str = "??";
                    break;
            }

            //add width & center for table
            if (isMany)
            {
                var attr = (item.Width > 0) ? " width='" + item.Width + "px'" : "";
                if (center)
                    attr += " class='text-center'";
                str = "<td" + attr + ">" + str + "</td>";
            }
            return str;
        }

        /// <summary>
        /// get component start string
        /// </summary>
        /// <param name="type">component type, ex: XiHide</param>
        /// <returns>part component string</returns>
        private string CompStart(string type)
        {
            //must escape '{'
            return $"@await Component.InvokeAsync(\"{type}\", new {type}Dto{{ ";
        }

        /// <summary>
        /// get view item end string
        /// </summary>
        /// <returns></returns>
        private string CompEnd()
        {
            return " })";
        }

        /// <summary>
        /// get edit view header(th) string for Multiple table
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private string EViewHeadStr(CrudEitemDto item)
        {
            //skip some types
            if (item.InputType == InputTypeEstr.Hide || item.InputType == InputTypeEstr.Sort)
                return "";

            //@await Component.InvokeAsync("XgTh", new { title = "XXX", required = true })
            return (item.Required || _Str.NotEmpty(item.PlaceHolder))
                ? CompStart("XgTh") +
                    ColsToStr(
                        ViewTitle(item.Name),
                        ViewPlaceHolder(item.PlaceHolder),
                        ViewRequired(item.Required)) +
                    CompEnd()
                : string.Format("<th{0}>{1}</th>", 
                    (_Str.IsEmpty(item.Cols) || item.Cols=="0" ? "" : " width='" + item.Cols + "'"), 
                    item.Name);
        }
        #endregion

        #region get view(edit/read) column content
        //get view field id
        private string ViewTitle(string title)
        {
            return KeyValue("Title", title, true);
        }
        private string ViewFid(string fid)
        {
            return KeyValue("Fid", fid, true);
        }
        /*
        private string ViewPwd(string type)
        {
            return KeyValue("IsPwd", type, true);
        }
        */

        private string ViewLabel(string label)
        {
            return _Str.IsEmpty(label)
                ? ""
                : KeyValue("Label", label, true);
        }
        private string ViewRequired(bool required)
        {
            return required
                ? KeyValue("Required", "true")
                : "";
        }
        private string ViewPlaceHolder(string value)
        {
            return _Str.IsEmpty(value)
                ? ""
                : KeyValue("PlaceHolder", value, true);
        }
        private string ViewInRow(bool isGroup)
        {
            return isGroup
                ? KeyValue("InRow", BoolToStr(isGroup))
                : "";
        }
        /// <summary>
        /// get bool key-value for view
        /// </summary>
        /// <param name="fid"></param>
        /// <param name="value"></param>
        /// <param name="writeStatus">get only when status</param>
        /// <returns></returns>
        private string ViewBool(string fid, bool value, bool writeStatus = true)
        {
            return (value == writeStatus)
                ? KeyValue(fid, BoolToStr(value))
                : "";
        }

        private string ViewSelectRows(CrudQEitemDto item)
        {
            if (_Str.IsEmpty(item.ItemData)) return "";

            //viewBag欄位不取字尾A字元(表示async)
            var value = (item.ItemData[^1] == 'A') ? item.ItemData[..^1] : item.ItemData;
            return KeyValue("Rows", "ViewBag." + value);
        }

        //get view of column length
        private string ViewMaxLen(string dataType)
        {
            //get column length
            var lenStr = _Str.GetMid(dataType, "(", ")");
            var len = 0;
            if (lenStr.Length == 0)
                len = 10;
            else if (int.TryParse(lenStr, out int len2))
                len = len2;

            return (len == 0)
                ? ""
                : KeyValue("MaxLen", len);
        }

        //get view LayoutCols, return "cols" if empty
        private string ViewLayout(bool isMany, string layoutCols)
        {
            /*
            var value = (_Str.IsEmpty(layoutCols))
                ? (isGroup ? "new int[]{0, 2, 3}" : "cols")
                : "new int[]{" + (isGroup ? "0," : "1,") + layoutCols + "}";
            return ViewColStr(value);
            */
            return isMany
                ? ""
                : KeyValue("Cols", layoutCols, true);
        }

        //get view column string
        private string KeyValue(string fid, object value, bool quote = false)
        {
            if (_Object.IsEmpty(value))
                return "";

            var value2 = value.ToString();
            if (quote)
                value2 = "\"" + value2 + "\"";
            return fid + " = " + value2;
        }
        #endregion

        /// <summary>
        /// boolean to string
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        private string BoolToStr(bool value)
        {
            return value ? "true" : "false";
        }

        /// <summary>
        /// concate view column list
        /// </summary>
        /// <param name="cols"></param>
        /// <returns></returns>
        private string ColsToStr(params string[] cols)
        {
            var result = "";
            foreach (var col in cols)
            {
                if (_Str.NotEmpty(col))
                    result += col + CommaSep;
            }

            if (result != "")
                result = result[..^CommaSep.Length];
            return result;
        }

        /*
        private int GetColLen(string dataType)
        {
            var num = _Str.GetMid(dataType, "(", ")");
            return (num.Length == 0) ? 10 : Convert.ToInt32(num);
        }
        */

        /// <summary>
        /// get service(edit/read) fid string
        /// </summary>
        /// <param name="fid"></param>
        /// <param name="value"></param>
        /// <param name="quote"></param>
        /// <returns></returns>
        private string SvcFid(string fid, string value, bool quote = false)
        {
            if (_Str.IsEmpty(value))
                return "";
            if (quote)
                value = "\"" + value + "\"";
            return CommaSep + fid + " = " + value;
        }

        #region get mapping name
        /// <summary>
        /// get query item operator name by type
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        private string QitemOpName(string type)
        {
            return type switch
            {
                ItemOpEstr.Equal => "",//not show
                ItemOpEstr.Like => "ItemOpEstr.Like",
                ItemOpEstr.NotLike => "ItemOpEstr.NotLike",
                ItemOpEstr.In => "ItemOpEstr.In",
                ItemOpEstr.Like2 => "ItemOpEstr.Like2",
                ItemOpEstr.LikeList => "ItemOpEstr.LikeList",
                ItemOpEstr.LikeCols => "ItemOpEstr.LikeCols",
                ItemOpEstr.Like2Cols => "ItemOpEstr.Like2Cols",
                ItemOpEstr.IsNull => "ItemOpEstr.IsNull",
                ItemOpEstr.NotNull => "ItemOpEstr.NotNull",
                ItemOpEstr.InRange => "ItemOpEstr.InRange",
                ItemOpEstr.UserDefined => "ItemOpEstr.UserDefined",
                _ => "??",
            };
        }

        /// <summary>
        /// get check type name
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        private string CheckTypeName(string type)
        {
            return type switch
            {
                "" => "",
                CheckTypeEstr.None => "",
                CheckTypeEstr.Email => "CheckTypeEstr.Email",
                CheckTypeEstr.Url => "CheckTypeEstr.Url",
                CheckTypeEstr.Min => "CheckTypeEstr.Min",
                CheckTypeEstr.Max => "CheckTypeEstr.Max",
                CheckTypeEstr.Range => "CheckTypeEstr.Range",
                _ => "??",
            };
        }
        #endregion

    }//class
}