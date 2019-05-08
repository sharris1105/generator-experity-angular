using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using <%= appName %>.Core.Constants;
using <%= appName %>.Core.Helpers;
using <%= appName %>.Core.Interfaces;

namespace <%= appName %>.Core.Services
{
    public class SampleApiService : ISampleApiService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly HttpClient _client;
        private readonly ApiServiceHelper _apiServiceHelper;

        public SampleApiService(IHttpClientFactory httpClientFactory, ApiServiceHelper apiServiceHelper)
        {
            _httpClientFactory = httpClientFactory;
            _apiServiceHelper = apiServiceHelper;
            _client = _httpClientFactory.CreateClient(EnvironmentConstants.SampleApiName);
        }

        public async Task<IActionResult> GetDataAsync(bool getData)
        {
            var urlString = $"{SampleApiRoute.GetData}?GetData={getData}";
            var response = _client.GetAsync(urlString);
            return await _apiServiceHelper.ConstructActionResult<List<object>>(response).ConfigureAwait(false);
        }
    }
}