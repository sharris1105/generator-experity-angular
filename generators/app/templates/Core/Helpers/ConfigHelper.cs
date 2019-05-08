using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.Extensions.Configuration;

namespace <%= appName %>.Core.Helpers
{
    public static class ConfigHelper
    {
        public static IConfigurationRoot ConfigureFromAppSettings()
        {
            var environmentName = Environment.GetEnvironmentVariable("ASPNET_ENV");

            if (string.IsNullOrEmpty(environmentName))
            {
                environmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            }

            if (string.IsNullOrEmpty(environmentName))
            {
                environmentName = "Production";
            }

            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{environmentName}.json", true, true)
                .AddJsonFile($"appsettings.{Environment.MachineName}.json", true, true)
                .AddJsonFile("launchSettings.json", true, true)
                .AddJsonFile($"launchSettings.{environmentName}.json", true, true)
                .AddJsonFile($"launchSettings.{Environment.MachineName}.json", true, true)
                .Build();

            ConfigureFromConfiguration(config);

            return config;
        }

        public static void ConfigureFromJson(string configFileName)
        {
            var configDirectory = Directory.GetCurrentDirectory();
            ConfigureFromJson(configFileName, configDirectory);
        }

        public static void ConfigureFromJson(string configFileName, string configDirectory)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(configDirectory)
                .AddJsonFile(configFileName, true, true)
                .Build();

            ConfigureFromConfiguration(configuration);
        }

        private static void ConfigureFromConfiguration(IConfiguration configuration)
        {
            //Try ConnectionStrings on their Own
            List<IConfigurationSection> connectionStrings = configuration.GetSection("ConnectionStrings").GetChildren().ToList();

            if (!connectionStrings.Any())
            {
                var llblGenSettings = configuration.GetSection("LLBLGen");
                connectionStrings = llblGenSettings.GetSection("ConnectionStrings").GetChildren().ToList();
            }
        }
    }
}
