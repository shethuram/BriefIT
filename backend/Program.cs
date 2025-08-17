
using backend.Configuration;
using backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddAuthentication(opt => {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "http://webapp-api.runasp.net",
                    ValidAudience = "http://webapp-api.runasp.net",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superdooperSafetySecretKerdtfhyhey@456789"))
                };
            });



            // Bind EmailSettings from appsettings.json

            builder.Services.Configure<EmailSettings>(
                builder.Configuration.GetSection("EmailSettings")
                );


            builder.Services.AddControllers();
            builder.Services.AddAuthorization();


            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder => builder
                        .AllowAnyOrigin()
                         .AllowAnyMethod()
                        .AllowAnyHeader());      
            });

            // allowall policy is configured 

           

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddLogging();


            builder.Services.AddDbContext<UserContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            var app = builder.Build();

            app.UseCors("AllowAll");        // allow all policy

           
                app.UseSwagger();
                app.UseSwaggerUI();
            

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
