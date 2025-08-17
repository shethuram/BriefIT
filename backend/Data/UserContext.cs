using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;

namespace backend.Data
{
    public class UserContext : DbContext
    {

        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }


        public DbSet<Register> Register { get; set; }

    }
}
