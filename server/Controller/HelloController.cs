using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers // Match your actual project namespace
{
    [ApiController]
    [Route("api/[controller]")]
    public class HelloController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() => Ok("Hello from .NET 9!");
    }
}
