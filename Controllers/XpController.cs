using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class XpController : Controller
    {

        //id: project Id
        public JsonResult GetProjects()
        {
            return Json(_XpCode.GetProjects());
        }

        public JsonResult GetTables(string projectId)
        {
            return Json(_XpCode.GetTables(projectId));
        }

    }//class
}