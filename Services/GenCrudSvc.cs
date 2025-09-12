using Base.Enums;
using Base.Services;
using DbAdm.Enums;
using DbAdm.Models;
using HandlebarsDotNet;
using System.Web;

namespace DbAdm.Services
{
    //generate CRUD, use Handlebars.net
    public class GenCrudSvc
    {
        //constant
        const string CommaSep = ", ";       //comma seperator
        const string CrudProg = "[prog]";   //key word inside file name
        const string PosGroup0 = "-abc99";  //impossible value for initial

        //rows for curdId list
        private List<CrudDto> _cruds = null!;
        private List<CrudQitemDto>? _qitems = null;
        private List<CrudRitemDto>? _ritems = null;
        private List<CrudEtableDto>? _etables = null;
        private List<CrudEitemDto>? _eitems = null;

        //template folder
        private readonly string _tplDir = _Fun.DirRoot + "_template/";

        //generated 6 files, 1(template),2(target folder),3(target file)
        private readonly string[] _crudFiles = [
            "Controller.txt", "Controllers", "[prog]Controller.cs",
            "ReadService.txt", "Services", "[prog]Read.cs",
            "EditService.txt", "Services", "[prog]Edit.cs",
            "ReadView.txt", "Views/[prog]", "Read.cshtml",
            "EditView.txt", "Views/[prog]", "Edit.cshtml",
            "JS.txt", "wwwroot/js/view", "[prog].js",
        ];

        //crud files count -> 6
        //private readonly int _crudFileLen;

        //constructor
        public GenCrudSvc()
        {
            //_crudFileLen = _crudFiles.Length;
        }

        /// <summary>
        /// async for file io
        /// </summary>
        /// <param name="crudIdList2"></param>
        /// <returns>error msg if any</returns>
        public async Task<string> RunA(string crudIdList2)
        {
            //only alpha, num and ','
            //if (!_Str.CheckKeyRule(crudIdList2, "GenCrudService Run()"))
            if (!_Str.CheckKey(crudIdList2))
                return "GenCrudService.cs RunA() only accept alphabet and numeric: (" + crudIdList2 + ")";

            var crudIds = crudIdList2.Split(',');
            var crudIdList = _Str.ListAddQuote(crudIdList2);

            #region get instance variables
            //1.get _cruds(Crud rows)
            var db = _Xp.GetDb();
            _cruds = (from c in db.Crud
                      join p in db.Project on c.ProjectId equals p.Id
                      //join t in db.Table on a.TableId equals t.Id
                      where crudIds.Contains(c.Id)
                      select new CrudDto()
                      {
                          Id = c.Id,
                          Project = p.Code,
                          ProjectPath = p.ProjectPath,
                          ProgName = c.ProgName,
                          ProgCode = c.ProgCode,
                          TableAs = c.TableAs,
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
                      .ToList();

            _qitems = (from q in db.CrudQitem
                       join c in db.Column on q.ColumnId equals c.Id
                       where crudIds.Contains(q.CrudId)
                       orderby q.CrudId, q.Sort
                       select new CrudQitemDto()
                       {
                           CrudId = q.CrudId,
                           Fid = c.Code,
                           Name = c.Name,
                           DataType = c.DataType,
                           PosGroup = q.PosGroup,
                           LayoutCols = q.LayoutCols,
                           PlaceHolder = "",
                           IsFind2 = q.IsFind2,
                           Op = q.Op,
                           InputType = q.InputType,
                           ItemData = q.ItemData,
                       })
                       .ToList();

            //2.get _crudRitems(CrudRitem rows)
            _ritems = (from r in db.CrudRitem
                       where crudIds.Contains(r.CrudId)
                       orderby r.CrudId, r.Sort
                       select new CrudRitemDto()
                       {
                           CrudId = r.CrudId,
                           RitemType = r.RitemType,
                           //ExtInfo = r.ExtInfo,
                           Name = r.Name,
                           Width = r.Width,
                           ColumnCode = r.ColumnCode,
                           //Column = c.Name,
                       })
                       .ToList();

            //3.get _crudEtable(CrudEtable rows)
            _etables = (from e in db.CrudEtable
                        join t in db.Table on e.TableId equals t.Id
                        where crudIds.Contains(e.CrudId)
                        select new CrudEtableDto()
                        {
                            Id = e.Id,
                            CrudId = e.CrudId,
                            TableCode = t.Code,
                            TableName = t.Name,
                            PkeyFid = e.PkeyFid,
                            FkeyFid = e.FkeyFid,
                            AutoIdLen = e.AutoIdLen ?? "",
                            HasCol4 = (e.Col4 == "1"),
                            HalfWidth = e.HalfWidth,
                            OrderBy = e.OrderBy,
                        })
                        .ToList();

            //4.get _crudEitem(CrudEitem rows)
            _eitems = (from e in db.CrudEitem
                       join t in db.CrudEtable on e.EtableId equals t.Id
                       join c in db.Column on e.ColumnId equals c.Id
                       where crudIds.Contains(t.CrudId)
                       select new CrudEitemDto()
                       {
                           EtableId = t.Id,
                           Fid = c.Code,
                           Name = c.Name,
                           DataType = c.DataType,
                           Required = e.Required,
                           HasCreate = e.HasCreate,
                           HasUpdate = e.HasUpdate,
                           CheckType = e.CheckType,
                           CheckData = e.CheckData,
                           InputType = e.InputType,
                           ItemData = e.ItemData,
                           PosGroup = e.PosGroup,
                           LayoutCols = e.LayoutCols,
                           PlaceHolder = e.PlaceHolder,
                           Sort = e.Sort,
                           Width = e.Width,
                       })
                       //.OrderBy(a => new { a.EtableId, a.Sort })  //.net core not support !!
                       .OrderBy(a => a.EtableId).ThenBy(a => a.Sort)
                       .ToList();

            db.Dispose();
            #endregion

            //loop generate files
            foreach (var crudId in crudIds)
            {
                string error;
                try
                {
                    error = await GenByCrudIdA(crudId);
                }
                catch (Exception ex)
                {
                    error = ex.Message;
                }
                if (_Str.NotEmpty(error))
                    return error;
            }

            //case of ok
            return "";
        }

        /// <summary>
        /// generate crud files by crudId
        /// </summary>
        /// <param name="crudId"></param>
        /// <returns>error msg if any</returns>
        private async Task<string> GenByCrudIdA(string crudId)
        {
            #region 1.check & get crud related rows
            var error = "";
            var crud = _cruds.FirstOrDefault(a => a.Id == crudId);
            if (crud == null)
            {
                error = "no CrudId: " + crudId;
                goto lab_error;
            }

            //rows for one crudId
            var qitems = _qitems!.Where(a => a.CrudId == crudId).ToList();   //find fields
            var ritems = _ritems!.Where(a => a.CrudId == crudId).ToList();   //result fields
            var etables = _etables!.Where(a => a.CrudId == crudId).ToList();
            #endregion

            #region 2.set fields: crud.RsItemStrs && IsGroup, IsGroupStart, IsGroupEnd
            //dropdown list types
            var ddlpTypes = new List<string>() { InputTypeEstr.Select, InputTypeEstr.Radio };
            var qitemLen = (qitems == null) ? 0 : qitems.Count;
            int i;
            if (qitemLen > 0)
            {
                var rSitemStrs = new List<String>();
                var posGroup = PosGroup0;   //initial value, get one impossible value for avoid repeat
                for (i=0; i<qitemLen; i++)
                {
                    //set rSitemStrs
                    var qitem = qitems![i];
                    rSitemStrs.Add(RServiceItemStr(qitem));

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
                crud.RsItemStrs = rSitemStrs;
                crud.HasFitemCols = qitems!.Any(a => _Str.IsEmpty(a.LayoutCols));

                //set ReadSelectCols, be [] when null !!
                //字尾A表示非同步
                crud.ReadSelectCols = qitems!
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
                var editSelectCols = _eitems!
                    .Where(a => ddlpTypes.Contains(a.InputType) &&
                        !qitemDatas.Contains(a.ItemData))
                    .Select(a => (a.ItemData.Length > 0 && a.ItemData[^1] == 'A')
                        ? $"ViewBag.{a.ItemData[..^1]} = await _XpCode.{a.ItemData}();"
                        : $"ViewBag.{a.ItemData} = _XpCode.{a.ItemData}();")
                    .Distinct()
                    .ToList();
                if (editSelectCols != null)
                    crud.ReadSelectCols.AddRange(editSelectCols);

                //crud.HasSelectA = (crud.ReadSelectCols.Count > 0 || crud.EditSelectCols.Count > 0);
                var asyncCount = crud.ReadSelectCols.Count(a => a.Contains("await"));
                crud.HasSelectA = asyncCount > 0;

                //加上 Db
                if (asyncCount > 1)
                {
                    var items = crud.ReadSelectCols;
                    for (i = 0; i < items.Count; i++)
                    {
                        if (items[i].Contains("await"))
                            items[i] = items[i].Replace("()", "(db)");
                    }
                    crud.ReadSelectCols.Insert(0, "var db = new Db();");
                    crud.ReadSelectCols.Add("await db.DisposeAsync();");
                }
                #endregion

                //set Fitems, F2items
                var find2Pos = qitems!.FindIndex(a => a.IsFind2);
                var hasFind2 = (find2Pos > 0);    //must > 0
                crud.HasFindForm = true;
                crud.HasFind2Form = hasFind2;

                //split qitems to qitems2
                if (hasFind2)
                {
                    var qitems2 = new List<CrudQitemDto>();
                    var q2Len = qitemLen - find2Pos;
                    qitems2.AddRange(qitems.GetRange(find2Pos, q2Len));
                    qitems.RemoveRange(find2Pos, q2Len);
                    crud.Qitems2 = qitems2;
                    qitemLen -= find2Pos;    //adjust

                    //set RvStr
                    foreach (var qitem2 in qitems2)
                        qitem2.RvStr = ViewItemStr(etables[0], qitem2);
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
                    fitem.RvStr = ViewItemStr(etables[0], fitem);

                qitems.Insert(pos + 1, new CrudQitemDto()
                {
                    RvStr = CompStart("XgFindTbar") +
                        ConcatViewCols(
                            ViewBool("IsHori", crud.LabelHori, false),
                            ViewBool("HasReset", crud.HasReset, true),
                            ViewBool("HasFind2", hasFind2, true)) +
                        CompEnd(),

                    IsGroupStart = false,
                    IsGroupEnd = true,
                    IsGroup = true,
                });
                crud.Qitems = qitems;
            }
            else
            {
                //be [] when null for easy coding !!
                crud.ReadSelectCols = new List<string>();
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

                    var jsStr = JsColDefStr(crud, ritem, i);
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

                crud.Ritems = ritems;
                crud.JsColDefStrs = jsStrs;
            }
            #endregion

            #region 5.set fields crud.MainTable, crud.ChildTables
            //set etable.Eitems
            var etableLen = etables.Count;
            for (i = 0; i < etableLen; i++)
            {
                var etable = etables[i];
                var eitems = _eitems!.Where(a => a.EtableId == etable.Id).ToList();
                etable.Eitems = eitems;

                var posGroup = PosGroup0;   //set impossible init value
                var eitemLen = eitems.Count;
                var isTable = (i > 0);
                for (var j=0; j< eitemLen; j++)
                {
                    var eitem = eitems[j];
                    eitem.ServiceStr = EServiceItemStr(eitem);
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
                        (eitems[j + 1].PosGroup != eitem.PosGroup);
                    posGroup = eitem.PosGroup;
                }
            }
            crud.MainTable = etables[0];

            //set ChildTables & ManyTables
            if (etableLen > 1)
            {
                //set ChildTables
                crud.ChildTables = new List<CrudEtableDto>();
                var childTables = crud.ChildTables;
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
                crud.ManyTables = string.Join(", ", crud.ChildTables
                    .Select(a => "_me.m" + a.TableCode)
                    .ToList());
            }
            #endregion

            #region File
            //set crud.HasFile
            var files = etables.SelectMany(a => a.Eitems)
                .Where(a => a.InputType == InputTypeEstr.File)
                .ToList();
            //crud.HasFile = etables.SelectMany(a => a.Eitems).Any(b => b.ItemType == InputTypeEstr.File);
            crud.HasFile = (files != null && files.Count > 0);
            if (crud.HasFile)
            {
                //FileType0, FileType1
                var mainTableId = crud.MainTable.Id;
                crud.FileType1 = files!.Any(a => a.EtableId != mainTableId);
                crud.FileType0 = !crud.FileType1;

                //FileEditArg, FileEditTypeArg, FileEditStrs
                if (crud.FileType0)
                {
                    var file = files!.First(a => a.EtableId == mainTableId);
                    var fid2 = $"t0_{file.Fid}";
                    crud.FileEditArg = fid2;
                    crud.FileEditTypeArg = $"IFormFile {crud.FileEditArg}";
                    crud.FileEditStrs = new List<string>()
                    {
                        $"await _HttpFile.SaveCrudFileA(json, service.GetNewKeyJson(), _Xp.Dir{crud.ProgCode}, {fid2}, nameof({fid2}));"
                    };
                }
                else
                {
                    crud.FileEditArg = "";
                    crud.FileEditTypeArg = "";
                    crud.FileEditStrs = new List<string>();
                    var sep = "";
                    foreach (var file in files!)
                    {
                        if (file.EtableId == mainTableId)
                        {
                            var fid2 = $"t0_{file.Fid}";
                            crud.FileEditArg += sep + fid2;
                            crud.FileEditTypeArg += sep + $"IFormFile {fid2}";
                            crud.FileEditStrs.Add($"await _HttpFile.SaveCrudFileA(json, service.GetNewKeyJson(), _Xp.Dir{crud.ProgCode}, {fid2}, nameof({fid2}));");
                        }
                        else
                        {
                            var etable = crud.ChildTables!.First(a => a.Id == file.EtableId);
                            var fid2 = $"t0{etable.Sort}_{file.Fid}";
                            crud.FileEditArg += sep + fid2;
                            crud.FileEditTypeArg += sep + $"List<IFormFile> {fid2}";
                            crud.FileEditStrs.Add($"await _HttpFile.SaveCrudFilesA(json, service.GetNewKeyJson(), _Xp.Dir{etable.TableCode}, {fid2}, nameof({fid2}));");
                        }
                        sep = ", ";
                    }
                }
            }
            #endregion

            //generate crud files
            var isManyEdit = (etables.Count > 1);
            var projectPath = _Str.AddDirSep(crud.ProjectPath);
            for (i = 0; i < _crudFiles.Length; i += 3)
            {
                #region 6.read template file to string
                var tplFile = _tplDir + _crudFiles[i];
                var tplStr = await _File.ToStrA(tplFile);
                if (tplStr == null)
                {
                    error = "no template file: " + tplFile + "," + "??";
                    goto lab_error;
                }
                #endregion

                //7.template string replace
                var mustache = Handlebars.Compile(tplStr);
                var result = HttpUtility.HtmlDecode(mustache(crud));

                #region 8.rename existed file if need
                var tableCode = crud.ProgCode;
                var toDir = projectPath + _Str.AddDirSep(_crudFiles[i + 1]).Replace(CrudProg, tableCode);
                var toFile = toDir + _crudFiles[i + 2].Replace(CrudProg, tableCode);
                //var toFile = _File.GetNextFileName(toDir + _crudFiles[i + 2].Replace(CrudTable, tableName), true);
                if (File.Exists(toFile))
                    File.Copy(toFile, _File.GetNextFileName(toFile, true));
                #endregion 
                
                //9.save file
                _File.MakeDir(toDir);   //create folder when need
                await _File.StrToFileA(result, toFile);
            }//for

            //case of ok
            return "";

        lab_error:
            return "GenCrudService.cs GenByCrudIdAsync() error: " + error;
            //return false;
        }

        #region get item string
        /// <summary>
        /// get js column define string (ritem)
        /// </summary>
        /// <returns></returns>
        private string JsColDefStr(CrudDto crud, CrudRitemDto ritem, int i)
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
        private string EServiceItemStr(CrudEitemDto item)
        {
            if (_Str.IsEmpty(item.Fid))
                return "";

            return "new() { " +
                KeyValue("Fid", item.Fid, true) +
                ServiceFid("Required", item.Required ? "true" : "") +
                ServiceFid("Create", !item.HasCreate ? "false" : "") +
                ServiceFid("Update", !item.HasUpdate ? "false" : "") +
                ServiceFid("CheckType", GetCheckTypeName(item.CheckType)) +
                ServiceFid("CheckData", item.CheckData, true) +
                " },";
        }

        /// <summary>
        /// get read service item string
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private string RServiceItemStr(CrudQitemDto item)
        {
            return "new() { " +
                KeyValue("Fid", item.Fid, true) +
                ServiceFid("Op", QitemOpName(item.Op)) +
                " },";
        }

        /// <summary>
        /// add hidden field
        /// </summary>
        /// <param name="table"></param>
        /// <param name="item"></param>
        private void AddHideStr(CrudEtableDto table, CrudEitem0Dto item)
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
        /// <param name="table"></param>
        /// <param name="item"></param>
        /// <param name="isMany"></param>
        /// <returns></returns>
        private string ViewItemStr(CrudEtableDto table, CrudEitem0Dto item, bool isMany = false)
        {
            var center = false;
            var name = isMany ? "" : item.Name;
            string str;
            switch (item.InputType)
            {
                case InputTypeEstr.Hide:
                case InputTypeEstr.Sort:
                    //no need consider in table or not
                    AddHideStr(table, item);
                    return "";

                case InputTypeEstr.Text:
                case InputTypeEstr.Textarea:
                case InputTypeEstr.Password:
                    var compType = (item.InputType == InputTypeEstr.Textarea) 
                        ? "XiTextarea" : "XiText";
                    str = CompStart(compType) + 
                        ConcatViewCols(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            (item.InputType == InputTypeEstr.Password) ? KeyValue("IsPwd", "true") : "",
                            ViewMaxLen(item.DataType),
                            ViewRequired(item.Required),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.LayoutCols)) +
                        CompEnd();
                    break;

                case InputTypeEstr.Html:
                    str = CompStart("XiHtml") +
                        ConcatViewCols(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            //ViewMaxLen(item.DataType),
                            ViewRequired(item.Required),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.LayoutCols)) +
                        CompEnd();
                    break;

                case InputTypeEstr.Integer:
                case InputTypeEstr.Decimal:
                    var type2 = (item.InputType == InputTypeEstr.Integer)
                        ? "XiInt" : "XiDec";
                    str = CompStart(type2) +
                        ConcatViewCols(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            ViewRequired(item.Required),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.LayoutCols)) +
                            //TODO: add min/max if need
                        CompEnd();
                    break;

                case InputTypeEstr.Check:
                    center = true;
                    str = CompStart("XiCheck") + 
                        ConcatViewCols(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            //KeyValue("value", "1", true),
                            ViewInRow(item.IsGroup),
                            ViewLabel(item.ItemData)) +
                        CompEnd();
                    break;

                case InputTypeEstr.Radio:
                    center = true;
                    str = CompStart("XiRadio") +
                        ConcatViewCols(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            ViewSelectRows(item),
                            //KeyValue("value", "1", true),
                            ViewInRow(item.IsGroup)) +
                        CompEnd();
                    break;

                case InputTypeEstr.Date:
                    str = CompStart("XiDate") +
                        ConcatViewCols(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            ViewRequired(item.Required),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.LayoutCols)) +
                        CompEnd();
                    break;

                case InputTypeEstr.DateTime:
                    str = CompStart("XiDt") +
                        ConcatViewCols(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            ViewRequired(item.Required),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.LayoutCols)) +
                        CompEnd();
                    break;

                case InputTypeEstr.Select:
                    str = CompStart("XiSelect") + 
                        ConcatViewCols(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            ViewSelectRows(item),
                            ViewRequired(item.Required),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.LayoutCols)) +
                        CompEnd();
                    break;

                case InputTypeEstr.File:
                    str = CompStart("XiFile") + 
                        ConcatViewCols(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            ViewRequired(item.Required),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.LayoutCols)) +
                        CompEnd();
                    break;

                case InputTypeEstr.Modal:
                    item.Width = 85;
                    center = true;
                    //item.Name for modal title
                    str = CompStart("XgOpenModal") +
                        ConcatViewCols(
                            ViewTitle(item.Name),
                            ViewFid(item.Fid),
                            ViewMaxLen(item.DataType),
                            ViewRequired(item.Required)) +
                        CompEnd();
                    break;

                case InputTypeEstr.ReadOnly:
                    str = CompStart("XiRead") +
                        ConcatViewCols(
                            ViewTitle(name),
                            ViewFid(item.Fid),
                            ViewInRow(item.IsGroup),
                            ViewLayout(isMany, item.LayoutCols)) +
                        CompEnd();
                    break;

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
        /// get edit view header(th) string
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
                    ConcatViewCols(
                        ViewTitle(item.Name),
                        ViewPlaceHolder(item.PlaceHolder),
                        ViewRequired(item.Required)) +
                    CompEnd()
                : string.Format("<th{0}>{1}</th>", 
                    (_Str.IsEmpty(item.LayoutCols) || item.LayoutCols=="0" ? "" : " width='" + item.LayoutCols + "'"), 
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

        private string ViewSelectRows(CrudEitem0Dto item)
        {
            //不取字尾A字元(表示async)
            var value = _Str.IsEmpty(item.ItemData) ? "??" : 
                (item.ItemData[^1] == 'A') ? item.ItemData[..^1] : item.ItemData;
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
        private string ConcatViewCols(params string[] cols)
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
        private string ServiceFid(string fid, string value, bool quote = false)
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
        private string GetCheckTypeName(string type)
        {
            return type switch
            {
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