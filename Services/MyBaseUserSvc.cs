using Base.Interfaces;
using Base.Models;
using BaseApi.Services;

namespace DbAdm.Services
{
    public class MyBaseUserSvc : IBaseUserSvc
    {
        //get base user info
        public BaseUserDto GetData()
        {
            return _Http.CookieToBr();
        }
    }
}
