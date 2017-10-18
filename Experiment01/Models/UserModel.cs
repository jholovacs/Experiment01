using System;
using Microsoft.AspNetCore.Identity;

namespace Experiment01.Models
{
	public class UserModel : IdentityUser<Guid>
	{
		public string Surname { get; set; }
		public string GivenName { get; set; }
		public string MiddleName { get; set; }
	}
}