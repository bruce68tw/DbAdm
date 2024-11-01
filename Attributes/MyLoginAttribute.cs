using Base.Enums;
using Base.Services;
using BaseApi.Attributes;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DbAdm.Attributes
{
    public class MyLoginAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (_Fun.IsNeedLogin())
                new XgLoginAttribute().OnActionExecuting(context);
            else
                base.OnActionExecuting(context);
        }

    } //class
}
