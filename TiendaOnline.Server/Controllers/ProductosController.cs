using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet]
        [Route("getproductsid/{id}")]
        public IEnumerable<Product> GetProductsByUser(int id)
        {
            var products = contexto.Products.Where(p => p.Idusers == id).ToList();

            return products;
        }

        public class ProductRequestDto
        {
            public int Idproducts { get; set; }
            public string Name { get; set; } = null!;
            public string? Description { get; set; }
            public decimal UnitPrice { get; set; }
            public int? Stock { get; set; }
            public string fileroute { get; set; }
            public int Idusers { get; set; }
            public int Idcategories { get; set; }
        }

        [HttpPost]
        [Route("addproduct")]
        public async Task<IActionResult> AddProduct([FromBody] ProductRequestDto productDto)
        {

            var product = new Product
            {
                Name= productDto.Name,
                Description = productDto.Description,
                UnitPrice= productDto.UnitPrice,
                Stock= productDto.Stock,
                Fileroute = productDto.fileroute,
                Idusers= productDto.Idusers,
                Idcategories = productDto.Idcategories
            };

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
            // Encuentra el producto correspondiente al ID
            var product = await contexto.Products.FirstOrDefaultAsync(p => p.Idproducts == id);

            // Verifica si el producto existe
            if (product == null)
            {
                return NotFound();
            }

            // Elimina el producto
            contexto.Products.Remove(product);
            await contexto.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }


    }
}
