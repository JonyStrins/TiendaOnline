using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TiendaOnline.Server.Data;
using TiendaOnline.Server.Models;

namespace TiendaOnline.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WishlistController : Controller
    {
        private readonly TiendaOnlineContext contexto;

        public WishlistController(TiendaOnlineContext contexto)
        {
            this.contexto = contexto;
        }


    }
}
