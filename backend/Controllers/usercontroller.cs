using backend.Data;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Net;
using System.Text;
using backend.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserContext _context;
        private readonly EmailSettings _emailSettings;


        public UserController(UserContext context , IOptions<EmailSettings> emailSettings)
        {
            _context = context;
            _emailSettings = emailSettings.Value; // inject email settings
        }



        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(RegisterDto register)
        {
           // if email exists already 
            if ( _context.Register.Any(u => u.Email == register.Email) )
                return BadRequest("Email already exists.");

            // Hash 
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(register.Password);

            Register obj = new Register
            {
                Username = register.Username,
                Email = register.Email,
                Password = hashedPassword
            };


            // Add to database
            _context.Register.Add(obj);
            await _context.SaveChangesAsync();

            return Ok();
        }




        [HttpPost("loginUser")]
        public async Task<IActionResult> LoginUser(LoginDto dto)
        {
            var user = await _context.Register
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
                return Unauthorized();


            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superdooperSafetySecretKerdtfhyhey@456789"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://webapp-api.runasp.net",
                audience: "http://webapp-api.runasp.net",
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

            return Ok(new AuthenticatedResponse { acesstoken = tokenString });

        }


        [Authorize]
        [HttpPost("sendSummary")]
        public async Task<IActionResult> SendSummary(ShareSummaryDto dto)
        {
            try
            {
                string senderEmail = _emailSettings.Username;

                using (SmtpClient client = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.SmtpPort))
                {
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(_emailSettings.Username, _emailSettings.Password);
                    client.EnableSsl = true;

                    foreach (var recipientEmail in dto.RecipientEmails)
                    {
                        string body = dto.Message ?? "Please find the summary attached.";

                        MailMessage mail = new MailMessage(senderEmail, recipientEmail)
                        {
                            Subject = "LLM GENERATED SUMMARY",
                            Body = body,
                        };

                        await client.SendMailAsync(mail); // async send
                    }
                }

                return Ok(new { message = "Mail sent successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to send mail.", error = ex.Message });
            }
        }








    }
}
