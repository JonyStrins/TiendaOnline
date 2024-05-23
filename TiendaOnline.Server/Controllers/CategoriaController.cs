using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TiendaOnline.Server.Data;
using TiendaOnline.Server.Models;

namespace TiendaOnline.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriaController : Controller
    {

        private readonly TiendaOnlineContext contexto;

        public CategoriaController(TiendaOnlineContext contexto)
        {
            this.contexto = contexto;
        }

        [HttpGet]
        [Route("getcategories")]
        public IEnumerable<Category> GetCategories()
        {
            return contexto.Categories;
        }

        [HttpPost]
        [Route("addcategory")]
        public async Task<IActionResult> AddCategory([FromBody] Category category)
        {

            if (!contexto.Categories.Contains(category))
            {
                await contexto.Categories.AddAsync(category);
                await contexto.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }

            return StatusCode(StatusCodes.Status406NotAcceptable, "La Categoria ya Existe");
        }

    }
}
