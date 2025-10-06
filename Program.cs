using Base.Enums;
using Base.Interfaces;
using Base.Models;
using Base.Services;
using BaseApi.Services;
using BaseWeb.Services;
using DbAdm.Models;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using System.Data.Common;
using System.Data.SqlClient;

#region set builder
var builder = WebApplication.CreateBuilder(args);

//6.appSettings "FunConfig" section -> _Fun.Config
var config = new ConfigDto();
builder.Configuration.GetSection("FunConfig").Bind(config);
_Fun.Config = config;

var myConfig = new MyConfigDto();
builder.Configuration.GetSection("MyConfig").Bind(myConfig);
_Xp.Config = myConfig;

builder.SetBuilder(config.AllowOrigins);
#endregion

#region set services
//1.config MVC
//��w: controller ���� CSRF
var services = builder.Services;
services.AddControllersWithViews(opts => { opts.Filters.Add(new AutoValidateAntiforgeryTokenAttribute()); })
//services.AddControllersWithViews()
    //view Localization
    //.AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
    //use pascal for newtonSoft json
    .AddNewtonsoftJson(opts => { opts.UseMemberCasing(); })
    //use pascal for MVC json
    .AddJsonOptions(opts => { opts.JsonSerializerOptions.PropertyNamingPolicy = null; });

//2.set Resources path
//services.AddLocalization(opts => opts.ResourcesPath = "Resources");

//3.http context
services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

//4.user info for base component
services.AddSingleton<IBaseUserSvc, MyBaseUserSvc>();

//5.ado.net for mssql
services.AddTransient<DbConnection, SqlConnection>();
services.AddTransient<DbCommand, SqlCommand>();

//cache server
//services.AddDistributedMemoryCache();   //AddDistributedRedisCache is old
services.AddMemoryCache();
//services.AddStackExchangeRedisCache(opts => { opts.Configuration = config.Redis; });
services.AddSingleton<ICacheSvc, CacheMemSvc>();
#endregion

#region set app
//initial & set locale
var app = builder.Build();
var isDev = app.Environment.IsDevelopment();
_Fun.Init(isDev, app.Services, DbTypeEnum.MSSql, AuthTypeEnum.Row, true);
await _Locale.SetCultureA(_Fun.Config.Locale);


// Configure the HTTP request pipeline.
if (isDev)
{
    //app.UseMigrationsEndPoint();
    app.UseDeveloperExceptionPage();

    // �}�o�Ҧ��G���ѭ�l�X (ts/css)
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(builder.Environment.ContentRootPath, "..", "Base/BaseFront")),
        RequestPath = "/BaseFront"
    });
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();  //for https, default HSTS 30 days. for change see https://aka.ms/aspnetcore-hsts.

    // �����Ҧ��G���� Vite build ��X
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(builder.Environment.ContentRootPath, "..", "Base/BaseFront/dist")),
        RequestPath = "/BaseFront"
    });
}

app.UseHttpsRedirection();
//app.UseStaticFiles();
app.UseRouting();
app.UseCors(); //�[�W��|�M�Ψ����
app.UseAuthentication();    //�{��
app.UseAuthorization();     //���v
//app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Login}/{id?}");

app.SetApp();   //��w�]�w, �Ѧ�_WebExt.cs
app.Run();
#endregion