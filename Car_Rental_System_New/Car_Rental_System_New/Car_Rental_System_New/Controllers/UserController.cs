using Car_Rental_System_New.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Car_Rental_System_New.DTOs;

namespace Car_Rental_System_New.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
       
        [HttpGet("all")]
        public IActionResult GetAllUsers()
        {
            try
            {
                var users = _userService.GetAllUsers();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
        }


        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            var user = _userService.Register(model.Username, model.Password, model.Role, model.Email);
            if (user == null)
            {
                return BadRequest(new { Message = "User registration failed: User already exists." });
            }
            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            var token = _userService.Authenticate(model.Username, model.Password);
            if (token == null)
            {
                return Unauthorized(new { Message = "Invalid credentials" });
            }
            return Ok(new { Token = token });
        }
       
        [HttpDelete("deactivate/{userId}")]
        public IActionResult DeactivateUser(int userId)
        {
            try
            {
                _userService.DeactivateUser(userId);
                return Ok(new { Message = "User has been successfully removed." });
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
        }


    }
}