using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace <%= appName %>.Core.Interfaces
{
    public interface ISampleApiService
{
    Task<IActionResult> GetDataAsync(bool getData);
}
}