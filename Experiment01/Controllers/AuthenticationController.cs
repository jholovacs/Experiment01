using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Experiment01.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace Experiment01.Controllers
{
    [Produces("application/json")]
    [Route("api/Authentication")]
    public class AuthenticationController : Controller
    {
	    private readonly UserManager<UserModel> _userManager;
	    private readonly SignInManager<UserModel> _signInManager;
	    public AuthenticationController(UserManager<UserModel> userManager, SignInManager<UserModel> signInManager)
	    {
		    _userManager = userManager;
		    _signInManager = signInManager;
	    }

	    [HttpPost]
		[Route("~/api/authentication/login")]
	    public async Task<IActionResult> Login(string username, string password)
	    {
		    try
		    {
			    var user = await _userManager.Users.FirstOrDefaultAsync(model => model.NormalizedUserName == _userManager.NormalizeKey(username));
			    var validCredentials = await _signInManager.CheckPasswordSignInAsync(user, password, false);
				if (validCredentials == SignInResult.Success)
				{
					var token = GetAuthenticatedToken(user);
					var model = new AuthenticationResponseModel
					{
						Token = token.ToString(),
						Username = username,
						RefreshToken = "refresh token goes here!"
					};
					return Ok(model);
				}
				return Unauthorized();
			}
		    catch (Exception ex)
			{
				ModelState.AddModelError("", ex, null);
			}
			return BadRequest(ModelState);
		}

	    private JwtSecurityToken GetAuthenticatedToken(UserModel user)
	    {
			//todo: this
		    var now = DateTime.UtcNow;
		    var claims = new Claim[]
		    {
			    new Claim(JwtRegisteredClaimNames.Sub, this.GetType().AssemblyQualifiedName),
			    new Claim(JwtRegisteredClaimNames.Iat, now.ToUniversalTime().ToString(CultureInfo.InvariantCulture), ClaimValueTypes.Integer64)
		    };

			var jwt = new JwtSecurityToken();

			return jwt;

		}

	    [HttpPost]
	    [Route("~/api/authentication/register")]
	    public async Task<IActionResult> Register(RegistrationRequestModel model)
	    {
			try
			{
				if (ModelState.IsValid)
				{
					var result = await _userManager.CreateAsync(new UserModel {Email = model.Email, UserName = model.Username});
					if (result.Succeeded) return Ok();
					var errors = 0;
					foreach (var error in result.Errors)
					{
						ModelState.AddModelError($"{++errors}", $"{error.Code}: {error.Description}");
					}
				}
			}
			catch (Exception ex)
			{
				ModelState.AddModelError("", ex, null);
			}
			return BadRequest(ModelState);
	    }
    }
}