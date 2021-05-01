using Base.Enums;
using Base.Models;
using Base.Services;
using DbAdm.Tables;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Data.Common;
using System.Data.SqlClient;

namespace DbAdm
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //1.use newtonSoft & pascal case json
            services.AddControllers().AddNewtonsoftJson(options =>
                {
                    options.UseMemberCasing();
                });

            //2.use pascal case json
            services.AddControllersWithViews().AddJsonOptions(options =>
                {                    
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                });

            //3.http context
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            //4.appSettings "FunConfig" section -> _Fun.Config
            var config = new ConfigDto();
            Configuration.GetSection("FunConfig").Bind(config);
            _Fun.Config = config;

            //5.avoid CS1030
            services.AddDbContext<MyContext>(options =>
            {
                options.UseSqlServer(config.Db);
                //options.UseSqlServer(Configuration.GetConnectionString("Db"));
            });

            //6.locale & user info for base component
            services.AddSingleton<IBaseResService, BaseResService>();
            services.AddSingleton<IBaseUserService, BaseUserService>();

            //7.ado.net for mssql
            services.AddTransient<DbConnection, SqlConnection>();
            services.AddTransient<DbCommand, SqlCommand>();

            //8.initial _Fun by mssql
            IServiceProvider di = services.BuildServiceProvider();
            _Fun.Init(di, DbTypeEnum.MSSql);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //set global
            _Fun.IsDebug = env.IsDevelopment();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
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

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
