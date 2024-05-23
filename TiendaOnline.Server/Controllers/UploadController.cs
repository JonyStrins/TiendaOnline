using Microsoft.AspNetCore.Mvc;

namespace TiendaOnline.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UploadController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public UploadController(IWebHostEnvironment webHost)
        {
            _webHostEnvironment = webHost;
        }

        [HttpPost("subir")]
        public IActionResult Upload(IFormFile file)
        {
            try
            {
                if (file.Length == 0)
                    return BadRequest("No se proporcionó ningún archivo o el archivo está vacío.");

                var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Uploads");

                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                string fullPath = Path.Combine(path, file.FileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                return Ok(file);
            }catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, stackTrace = ex.StackTrace });
            }
        }
    }
}
