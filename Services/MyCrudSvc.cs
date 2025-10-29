using Base.Services;
using DbAdm.Models;

namespace DbAdm.Services
{
    public class MyCrudSvc
    {
        /// <summary>
        /// 產生Crud程式碼
        /// </summary>
        /// <param name="issueId"></param>
        /// <returns>1(成功), or 錯誤訊息</returns>
        public async Task<string> GenCrudA(string crudId)
        {
            //check input
            if (!_Str.CheckKey(crudId))
                return $"MyCrudSvc.cs GenCrudA() only accept alphabet and numeric: ({crudId})";

            //讀取DB
            #region get instance variables
            //1.get _cruds(Crud rows) CrudDto from EF
            var db = _Xp.GetDb();
            var crud = (from c in db.Crud
                     join p in db.Project on c.ProjectId equals p.Id
                     //join t in db.Table on a.TableId equals t.Id
                     //where crudIds.Contains(c.Id)
                     where c.Id == crudId
                     select new CrudDto()
                     {
                         Id = c.Id,
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

            //query item
            var qitems = (from q in db.CrudQitem
                       join c in db.Column on q.ColumnId equals c.Id
                       where q.CrudId == crudId
                       orderby q.CrudId, q.Sort
                       select new CrudQitemDto()
                       {
                           CrudId = q.CrudId,
                           Fid = c.Fid,
                           Name = c.Name,
                           DataType = c.DataType,   //for 計算輸入欄位maxLen
                           PosGroup = q.PosGroup!,
                           LayoutCols = q.LayoutCols!,
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

            //3.get _crudEtable(CrudEtable rows)
            var etables = (from e in db.CrudEtable
                        join t in db.Table on e.TableId equals t.Id
                        where e.CrudId == crudId
                        select new CrudEtableDto()
                        {
                            Id = e.Id,
                            CrudId = e.CrudId,
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
            var eitems = (from e in db.CrudEitem
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
                           LayoutCols = e.LayoutCols!,
                           PlaceHolder = e.PlaceHolder!,
                           Sort = e.Sort,
                           Width = e.Width,
                       })
                       //.OrderBy(a => new { a.EtableId, a.Sort })  //.net core not support !!
                       .OrderBy(a => a.EtableId).ThenBy(a => a.Sort)
                       .ToList();

            db.Dispose();
            #endregion

            //call GenCrudSvc
            return await new GenCrudSvc().GenCrudByDtosA(crud!, qitems, ritems, etables, eitems);
            //return "";

            /*
        lab_error:
            _Log.Error($"IssueService.cs SendSurveyA() failed: {error} (Issue.Id={issueId})");
			return "無法寄送問卷，請聯絡管理者。";
            */
        }



    }//class
}