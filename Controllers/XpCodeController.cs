using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

//for �e�ݪ���Ū��, �����إ߭ӧO��controller
namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class XpCodeController : Controller
    {
        /*
        //id: project Id
        public async Task<JsonResult> Projects()
        {
            return Json(await _XpCode.ProjectsA());
        }
        */

        public async Task<JsonResult> Tables(string projectId)
        {
            return Json(await _XpCode.ByTablesA(projectId));
        }

    }//class
}