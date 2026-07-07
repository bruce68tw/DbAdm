using Base.Enums;
using Base.Interfaces;
using Base.Models;
using Base.Services;
using BaseApi.Services;
using BaseWeb.Services;
using DbAdm.Models;
using DbAdm.Services;
using System.Data.Common;
using System.Data.SqlClient;

#region 1.set builder
var builder = WebApplication.CreateBuilder(args);

//set fun.config
var config = new ConfigDto();
builder.Configuration.GetSection("FunConfig").Bind(config);
_Fun.Config = config;

//set my config
var myConfig = new MyConfigDto();
builder.Configuration.GetSection("MyConfig").Bind(myConfig);
_Xp.Config = myConfig;

//set builder
builder.SetBuilder();
#endregion

#region 2.set services
var multiLang = false;
var services = builder.Services;
services.SetServices(multiLang);

services.AddSingleton<IBaseUserSvc, MyBaseUserSvc>();   //user info for base component
services.AddTransient<DbConnection, SqlConnection>();   //ado.net for mssql
services.AddTransient<DbCommand, SqlCommand>();

//cache server
//services.AddDistributedMemoryCache();   //AddDistributedRedisCache is old
services.AddMemoryCache();
//services.AddStackExchangeRedisCache(opts => { opts.Configuration = config.Redis; });
services.AddSingleton<ICacheSvc, CacheMemSvc>();
#endregion

#region 3.set app & run
var app = builder.Build();
var isDev = app.Environment.IsDevelopment();
_Fun.Init(isDev, app.Services, DbTypeEnum.MSSql, AuthTypeEnum.Row, multiLang);
await _Locale.SetCultureA(_Fun.Config.Locale);

app.SetApp(isDev);
app.Run();
#endregion