using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using <%= appName %>.Core.Interfaces;

namespace <%= appName %>.Controllers
{
    [Route("api/[controller]")]
public class SampleDataController : Controller
{
    private readonly ISampleApiService _sampleApiService;

    public SampleDataController(ISampleApiService sampleApiService) //ToDo: Replace SampleApi stuff
    {
        _sampleApiService = sampleApiService;
    }

    [HttpGet("[action]/{getData}")]
    public async Task<IActionResult> GetData(bool getData) //ToDo: Replace SampleApi stuff
    {
        return await _sampleApiService.GetDataAsync(getData);
    }



    // ToDo: Remove Mock Forecast Stuff

    private static string[] Summaries = new[]
    {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

    [HttpGet("[action]")]
    public IEnumerable<WeatherForecast> WeatherForecasts() //This will be hooked up and returning data from an external api (should look like GetData method)
    {
        var rng = new Random();
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
            TemperatureC = rng.Next(-20, 55),
            Summary = Summaries[rng.Next(Summaries.Length)]
        });
    }
}
}
