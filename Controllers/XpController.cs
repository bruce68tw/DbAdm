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
            return Json(_Code.GetProjects());
        }

        public JsonResult GetTables(string projectId)
        {
            return Json(_Code.GetTables(projectId));
        }

    }//class
}