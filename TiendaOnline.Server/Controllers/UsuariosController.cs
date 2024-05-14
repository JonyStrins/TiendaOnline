using Microsoft.AspNetCore.Mvc;
using TiendaOnline.Server.Data;
using TiendaOnline.Server.Models;

namespace TiendaOnline.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuariosController : Controller
    {
        private readonly TiendaOnlineContext contexto;

        public UsuariosController(TiendaOnlineContext contexto)
        {
            this.contexto = contexto;
        }

        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return contexto.Users;
        }
    }
}
