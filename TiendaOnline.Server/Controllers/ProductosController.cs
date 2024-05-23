using Microsoft.AspNetCore.Mvc;
using TiendaOnline.Server.Data;
using TiendaOnline.Server.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

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

        public class ProductRequestDto
        {
            public int Idproducts { get; set; }
            public string Name { get; set; } = null!;
            public string? Description { get; set; }
            public decimal UnitPrice { get; set; }
            public int? Stock { get; set; }
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
            Product product = contexto.Products.Find(id);

            contexto.Products.Remove(product);
            await contexto.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
