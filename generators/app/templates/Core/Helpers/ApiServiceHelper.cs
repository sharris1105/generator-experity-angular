using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace <%= appName %>.Core.Helpers
{
    public class ApiServiceHelper
    {
        public async Task<IActionResult> ConstructActionResult<T>(Task<HttpResponseMessage> httpMessageTask, [CallerMemberName] string errorSource = "")
        {
            try
            {
                var httpMessage = await httpMessageTask.ConfigureAwait(false);
                try
                {
                    httpMessage.EnsureSuccessStatusCode();
                    var responseValue = JsonConvert.DeserializeObject<T>(await httpMessage.Content.ReadAsStringAsync().ConfigureAwait(false));
                    return new OkObjectResult(responseValue);
                }
                catch (HttpRequestException e)
                {
                    e.ToString();
                    return new ObjectResult($"{(int)httpMessage.StatusCode}: {httpMessage.ReasonPhrase} - {errorSource}")
                    {
                        StatusCode = (int)httpMessage.StatusCode,
                    };
                }
            }
            catch (Exception e)
            {
                e.ToString();
                return new ObjectResult($"{(int)HttpStatusCode.NotFound}: Not Found - {errorSource}")
                {
                    StatusCode = (int)HttpStatusCode.NotFound
                };
            }

        }

        public AuthenticationHeaderValue GenerateAuthHeader(string token)
        {
            var tokenArray = token.Split(' ');
            return new AuthenticationHeaderValue(tokenArray[0], tokenArray[1]);
        }
    }
}
