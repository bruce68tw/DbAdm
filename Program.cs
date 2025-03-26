using Base.Enums;
using Base.Interfaces;
using Base.Models;
using Base.Services;
using BaseWeb.Services;
using DbAdm.Models;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc.Razor;
using System.Data.Common;
using System.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

// Add services to the container.
//builder.Services.AddControllersWithViews();

#region set services
//1.config MVC
services.AddControllersWithViews()
    //view Localization
    .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
    //use pascal for newtonSoft json
    .AddNewtonsoftJson(opts => { opts.UseMemberCasing(); })
    //use pascal for MVC json
    .AddJsonOptions(opts => { opts.JsonSerializerOptions.PropertyNamingPolicy = null; });

//2.set Resources path
services.AddLocalization(opts => opts.ResourcesPath = "Resources");

//3.http context
services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

//4.user info for base component
services.AddSingleton<IBaseUserSvc, MyBaseUserService>();

//5.ado.net for mssql
services.AddTransient<DbConnection, SqlConnection>();
services.AddTransient<DbCommand, SqlCommand>();

//6.appSettings "FunConfig" section -> _Fun.Config
var config = new ConfigDto();
builder.Configuration.GetSection("FunConfig").Bind(config);
_Fun.Config = config;
//
var myConfig = new MyConfigDto();
builder.Configuration.GetSection("MyConfig").Bind(myConfig);
_Xp.Config = myConfig;

//cache server
//services.AddDistributedMemoryCache();   //AddDistributedRedisCache is old
services.AddMemoryCache();
//services.AddStackExchangeRedisCache(opts => { opts.Configuration = config.Redis; });
services.AddSingleton<ICacheSvc, CacheMemSvc>();

/*
//7.session (memory cache)
services.AddDistributedMemoryCache();
//services.AddStackExchangeRedisCache(opts => { opts.Configuration = "127.0.0.1:6379"; });
services.AddSession(opts =>
{
    opts.Cookie.HttpOnly = true;
    opts.Cookie.IsEssential = true;
    opts.IdleTimeout = TimeSpan.FromMinutes(60);
});
*/

//cors
string[] origins = _Fun.Config.AllowOrigins.Split(',');
services.AddCors(opts =>
{
    opts.AddDefaultPolicy(a =>
    {
        a.WithOrigins(origins);
        a.AllowAnyHeader();
        a.AllowAnyMethod();
        a.AllowCredentials();
    });
});

#endregion


var app = builder.Build();

//initial & set locale
var isDev = app.Environment.IsDevelopment();
_Fun.Init(isDev, app.Services, DbTypeEnum.MSSql, AuthTypeEnum.Row);
await _Locale.SetCultureA(_Fun.Config.Locale);


// Configure the HTTP request pipeline.
if (isDev)
{
    //app.UseMigrationsEndPoint();
    app.UseDeveloperExceptionPage();
    //app.UseExceptionHandler("/Home/Error");
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(); //加上後會套用到全域
app.UseAuthentication();    //認証
app.UseAuthorization();     //授權
//app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Login}/{id?}");

app.Run();
