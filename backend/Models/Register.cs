using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Register")]
    public class Register
    {
            [Key]
            public int Id { get; set; }
            public required string Username { get; set; }
            public required string Email { get; set; }
            public required string Password { get; set; } 
    }
}
