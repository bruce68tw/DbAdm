using Base.Enums;
using Base.Models;
using Base.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
            //use newtonSoft for json serialize for controller
            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    //use pascal case json
                    options.UseMemberCasing();
                });

            services.AddControllersWithViews()
                .AddJsonOptions(options =>
                {
                    //use pascal case json
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            //locale & user info for base component
            services.AddSingleton<IBaseResService, BaseResService>();
            services.AddSingleton<IBaseUserService, BaseUserService>();

            //appSettings "FunConfig" section -> _Fun.Config
            var config = new ConfigDto();
            Configuration.GetSection("FunConfig").Bind(config);
            _Fun.Config = config;

            //ado.net for mssql
            services.AddTransient<DbConnection, SqlConnection>();
            services.AddTransient<DbCommand, SqlCommand>();

            //initial _Fun by mssql
            IServiceProvider di = services.BuildServiceProvider();
            _Fun.Init(di, DbTypeEnum.MSSql);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
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
