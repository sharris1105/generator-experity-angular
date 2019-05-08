using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using <%= appName %>.Core.Helpers;
using <%= appName %>.Core.Interfaces;
using <%= appName %>.Core.Services;

namespace <%= appName %>
{
    public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        // ===== Define Strictly Typed Configs from AppSettings.json =====
        var clientConfig = StartUpHelper.GetEnvVariablesForApi(Configuration);
        services.AddSingleton(clientConfig);

        // ===== Define HttpClient =====
        services.AddHttpClient(clientConfig.ApiName, client =>
        {
            client.BaseAddress = new Uri(clientConfig.SampleApiBaseAddress);

            if (clientConfig.HeaderDefinitions != null)
            {
                foreach (KeyValuePair<string, string> h in clientConfig.HeaderDefinitions)
                {
                    client.DefaultRequestHeaders.Add(h.Key, h.Value);
                }
            }

            client.DefaultRequestHeaders.TransferEncodingChunked = false;
            //Default to application/json if no header type is specified
            if (client.DefaultRequestHeaders.Accept.Count == 0)
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            }
        });

        services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

        services.AddTransient<ISampleApiService, SampleApiService>();
        services.AddSingleton<ApiServiceHelper>();

        // In production, the Angular files will be served from this directory
        services.AddSpaStaticFiles(configuration =>
        {
            configuration.RootPath = "ClientApp/dist";
        });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseSpaStaticFiles();

        app.UseMvc(routes =>
        {
            routes.MapRoute(
                name: "default",
                template: "{controller}/{action=Index}/{id?}");
        });

        app.UseSpa(spa =>
        {
            // To learn more about options for serving an Angular SPA from ASP.NET Core,
            // see https://go.microsoft.com/fwlink/?linkid=864501

            spa.Options.SourcePath = "ClientApp";

            if (env.IsDevelopment())
            {
                spa.UseAngularCliServer(npmScript: "start");
            }
        });
    }
}
}
