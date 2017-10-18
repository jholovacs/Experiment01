using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Experiment01.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Experiment01.Services
{
    public class ApplicationDbContext:IdentityDbContext<UserModel, RoleModel, Guid>
    {
	    public ApplicationDbContext(DbContextOptions options) : base(options ) { }
    }
}
