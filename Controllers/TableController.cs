using Base.Models;
using Base.Services;
using BaseWeb.Services;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class TableController : Controller
    {
        #region Read View
        public ActionResult Read()
        {
            ViewBag.Projects = _Code.GetProjects(); //dropdown
            return View();
        }

        [HttpPost]
        public ContentResult GetPage(DtDto dt)
        {
            return Content(new TableRead().GetPage(dt).ToString(), _Web.AppJson);
        }

        public void Export(string cond)
        {
            new TableRead().Export(_Json.StrToJson(cond));
        }
        #endregion

        #region Edit View
        public ActionResult Edit()
        {
            return View();
        }
        
        public ContentResult GetJson(string key)
        {
            return Content(new TableEdit().GetJson(key).ToString(), _Web.AppJson);
        }
                
        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[Table]", "Id", key, status));
        }

        public JsonResult Delete(string key)
        {
            return Json(new TableEdit().Delete(key));
        }

        public JsonResult Create(string json)
        {
            return Json(new TableEdit().Create(_Json.StrToJson(json)));
        }
        public JsonResult Update(string key, string json)
        {
            return Json(new TableEdit().Update(key, _Json.StrToJson(json)));
        }
        #endregion

        #region others
        //generate database document in word type
        //[HttpPost]
        public void GenWord(string keys)
        {
            var tableIds = keys.Split(',');
            new GenDocuService().Run("", tableIds);
        }

        public async Task GenCrudAsync(string keys)
        {
            var service = new GenCrudService();
            await service.RunAsync(keys);
        }

        //generate CRUD
        //ids: 1(tableId list), 2(0/1:single/multiple)
        //return string list: 1(tableId), 2(status:1/0)
        [HttpPost]
        public string GenCrud(List<string> ids, List<bool> multis)
        {
            return "";
            /*
            //sql template
            var sql = @"
select 
    t.Name, p.ProjectPath, p.ProjectSpace
from dbo.[Table] t
inner join dbo.Project p on t.ProjectId=p.Id
where t.Id=@Id
";  
            //loop of generate crud
            var db = new Db();
            var service = new GenCrudService(_Fun.DirRoot + "_template", "City", "City2");
            var list = new List<string>();
            for (var i=0; i< ids.Count; i++)
            {
                //generate curd files
                var table = db.GetJson(sql, new List<object>() { "Id", ids[i] });
                if (table == null)
                {
                    //_Log.Error("Table.Id not found: " + tableId);
                    list.Add(ids[i]);
                    list.Add("0");
                    continue;
                }

                var name = table["Name"].ToString();
                var status = service.GenCrud6Files(table["ProjectSpace"].ToString(), name, multis[i], table["ProjectPath"].ToString())
                    ? "1" : "0";
                list.Add(ids[i]);
                list.Add(status);
            }
            db.Dispose();

            //return result
            return _List.ToStr(list, ",");
            */
        }
        #endregion

    }//class
}