using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using <%= appName %>.Core.ConfigModels;
using <%= appName %>.Core.Constants;

namespace <%= appName %>.Core.Helpers
{
    public class StartUpHelper
    {
        public static HttpClientConfig GetEnvVariablesForApi(IConfiguration config)
        {
            var conf = new HttpClientConfig
            {
                ApiName = EnvironmentConstants.SampleApiName,
                SampleApiBaseAddress = "https://devservices.practicevelocity.com/",
                HeaderDefinitions = new Dictionary<string, string>() {
                    {"Accept", "application/json"}
                },
                BaseRef = ""
            };
            return conf;
        }

        private static string GetSingleEnvVariable(string whichVar, IConfiguration config)
        {
            return !string.IsNullOrWhiteSpace(config.GetSection(whichVar).Value) ? config.GetSection(whichVar).Value : string.Empty;
        }
    }
}
