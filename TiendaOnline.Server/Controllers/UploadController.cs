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
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, stackTrace = ex.StackTrace });
            }
        }

        [HttpGet("getmultimedia")]
        public IEnumerable<MultimediaFile> GetMultimedia()
        {
            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Uploads");

            if (!Directory.Exists(path))
            {
                return Enumerable.Empty<MultimediaFile>();
            }

            var files = Directory.GetFiles(path);
            var multimediaFiles = files.Select(file => new MultimediaFile
            {
                FileName = Path.GetFileName(file),
                FilePath = Path.Combine("/uploads", Path.GetFileName(file)), // Cambia a la URL accesible desde el cliente
                FileSize = new FileInfo(file).Length,
                ContentType = GetContentType(file)
            });

            return multimediaFiles;
        }

        private string GetContentType(string path)
        {
            var provider = new Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(path, out var contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }
    }

    public class MultimediaFile
    {
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public long FileSize { get; set; }
        public string ContentType { get; set; }
    }
}
