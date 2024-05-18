using Microsoft.AspNetCore.Mvc;
using TiendaOnline.Server.Data;
using TiendaOnline.Server.Models;

namespace TiendaOnline.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductosController : Controller
    {

        private readonly TiendaOnlineContext contexto;

        public ProductosController(TiendaOnlineContext contexto)
        {
            this.contexto = contexto;
        }

        [HttpGet]
        [Route("getproducts")]
        public IEnumerable<Product> GetProducts()
        {
            return contexto.Products;
        }

        [HttpPost]
        [Route("addproduct")]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            await contexto.Products.AddAsync(product);
            await contexto.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("editproduct")]
        public async Task<IActionResult> EditProduct([FromBody] Product product)
        {
            contexto.Products.Update(product);
            await contexto.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("deleteproduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            Product product = contexto.Products.Find(id);

            contexto.Products.Remove(product);
            await contexto.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
