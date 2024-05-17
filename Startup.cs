using Base.Enums;
using Base.Interfaces;
using Base.Models;
using Base.Services;
using BaseWeb.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Razor;
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
            services.AddSingleton<IBaseUserSvc, BaseUserSvc>();

            //5.ado.net for mssql
            services.AddTransient<DbConnection, SqlConnection>();
            services.AddTransient<DbCommand, SqlCommand>();

			//6.appSettings "FunConfig" section -> _Fun.Config
            var config = new ConfigDto();
            Configuration.GetSection("FunConfig").Bind(config);
            _Fun.Config = config;

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //1.initial & set locale
            _Fun.Init(env.IsDevelopment(), app.ApplicationServices, DbTypeEnum.MSSql);

            //2.set locale, call async method here !!
            _Locale.SetCultureA(_Fun.Config.Locale);

            //3.exception handle
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseExceptionHandler("/Home/Error"); //temp
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
            //app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
