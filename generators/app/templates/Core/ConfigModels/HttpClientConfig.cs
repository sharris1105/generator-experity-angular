using System.Collections.Generic;

namespace <%= appName %>.Core.ConfigModels
{
    public class HttpClientConfig
{
    public string ApiName { get; set; }
    public string SampleApiBaseAddress { get; set; }
    public Dictionary<string, string> HeaderDefinitions { get; set; }
    public string BaseRef { get; set; }
}
}