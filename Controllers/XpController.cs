using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class XpController : Controller
    {

        //id: project Id
        public async Task<JsonResult> GetProjects()
        {
            return Json(await _XpCode.ProjectsA());
        }

        public async Task<JsonResult> GetTables(string projectId)
        {
            return Json(await _XpCode.ByTablesA(projectId));
        }

    }//class
}