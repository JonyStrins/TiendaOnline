using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public class UserRequestDto
        {
            public string Name { get; set; } = null!;
            public string Lastname { get; set; } = null!;
            public string Email { get; set; } = null!;
            public string Password{ get; set; } = null!;
            public string Address{ get; set; } = null!;
            public string Phone { get; set; } = null!;
        }

        [HttpPost]
        [Route("adduser")]
        public async Task<IActionResult> AddUser([FromBody] UserRequestDto userDto)
        {
            var user = new User
            {
                Name = userDto.Name,
                Lastname = userDto.Lastname,
                Email = userDto.Email,
                Password = userDto.Password,
                Address = userDto.Address,
                Phone = userDto.Phone
            };

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

        [HttpGet]
        [Route("getuserbycredentials")]
        public async Task<IActionResult> GetUserByCredentials(string email, string password)
        {
            var user = await contexto.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
            if (user == null)
            {
                return NotFound("User not found or incorrect password");
            }

            return Ok(user);
        }
    }
}
