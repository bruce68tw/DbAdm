using Base.Models;
using Base.Services;
using BaseApi.Services;
using BaseWeb.Services;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    public class HomeController : Controller
    {
        private bool encodePwd = true;

        public IActionResult Index()
        {
            return View();
        }

        public ActionResult Error()
        {
            var error = HttpContext.Features.Get<IExceptionHandlerFeature>();
            return View("Error", (error == null) ? _Fun.SystemError : error.Error.Message);
        }

        //called by XgLogin
        public ActionResult Login(string url = "")
        {
            return View(new LoginVo() { FromUrl = url });
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginVo vo)
        {
            //await _Login.LoginA(vo, encodePwd);
            //return View(vo);
            return await _Login.LoginA(vo, encodePwd)
                ? Redirect(_Str.IsEmpty(vo.FromUrl) ? "/Home/Index" : vo.FromUrl)
                : View(vo);
        }

        public ActionResult Logout()
        {
            _Http.SetCookie(_Fun.FidClientKey, "");
            return Redirect("/Home/Login");
        }
    }
}
