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
        [Route("getusers")]
        public IEnumerable<User> GetUsers()
        {
            return contexto.Users;
        }

        [HttpPost]
        [Route("adduser")]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            await contexto.Users.AddAsync(user);
            await contexto.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("edituser")]
        public async Task<IActionResult> EditUser([FromBody] User user)
        {
            contexto.Users.Update(user);
            await contexto.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("deleteuser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            User user = contexto.Users.Find(id);

            contexto.Users.Remove(user);
            await contexto.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
