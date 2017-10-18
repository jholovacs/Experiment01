using System.ComponentModel.DataAnnotations;

namespace Experiment01.Models
{
	public class RegistrationRequestModel
	{
		[Required]
		public string Username { get; set; }

		[DataType(DataType.EmailAddress)]
		[Required]
		public string Email { get; set; }

		[DataType(DataType.Password)]
		[Required]
		public string Password { get; set; }
	}
}