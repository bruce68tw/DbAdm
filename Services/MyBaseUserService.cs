using Base.Interfaces;
using Base.Models;
using BaseApi.Services;

namespace DbAdm.Services
{
    public class MyBaseUserService : IBaseUserSvc
    {
        //get base user info
        public BaseUserDto GetData()
        {
            return _Http.CookieToBr();
        }
    }
}
