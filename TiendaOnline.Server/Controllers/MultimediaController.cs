using Microsoft.AspNetCore.Mvc;
using TiendaOnline.Server.Data;
using TiendaOnline.Server.Models;

namespace TiendaOnline.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MultimediaController : Controller
    {

        private readonly TiendaOnlineContext contexto;

        public MultimediaController(TiendaOnlineContext contexto)
        {
            this.contexto = contexto;
        }

        [HttpGet]
        [Route("getMultimedia/{id}")]
        public IEnumerable<Multimedium> GetProducts(int id)
        {
            return contexto.Multimedia.Where(m => m.Idproducts == id);
        }

        [HttpPost]
        [Route("subirmultimedia")]
        public async Task<IActionResult> AddMultimedia([FromBody] Multimedium multimediaDto)
        {

            var multimedia = new Multimedium
            {
                Name = multimediaDto.Name,
                Fileroute = multimediaDto.Fileroute,
                Idproducts = multimediaDto.Idproducts,
            };

            await contexto.Multimedia.AddAsync(multimedia);
            await contexto.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
