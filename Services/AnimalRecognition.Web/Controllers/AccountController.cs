using AnimalRecognition.AccountManager;
using AnimalRecognition.Domain.AccountManager;
using AnimalRecognition.Domain.Entities;
using AnimalRecognition.Web.Dto.Request.Base;
using AnimalRecognition.Web.Models.AccountModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Security.Claims;

namespace AnimalRecognition.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly AccountManagerService _accountManageService;

        public AccountController(AccountManagerService accountManageService) => (_accountManageService) = (accountManageService);


        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public async Task<RequestResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                User user = new()
                {
                    Name = model.Name,
                    Email = model.Email,
                    PasswordHash = model.Password
                };

                var result = await _accountManageService.Register(user).ConfigureAwait(false);

                if (result.StatusCode == StatusCodeAccount.OK)
                {
                    return new RequestResult(true, null);
                }
                else if (result.StatusCode == StatusCodeAccount.EmailAlreadyRegistered)
                {
                    ModelState.AddModelError(nameof(model.Email), "This email is already registered.");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "An error has occurred. Please try again later.");
                }
            }

            var errors = ModelState.Where(x => x.Value.ValidationState == ModelValidationState.Invalid).Select(x =>
                new ModelStateError(x.Key, x.Value.Errors.Count > 0 ? x.Value.Errors[0].ErrorMessage : string.Empty)
            );

            return new RequestResult(false, errors);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public async Task<RequestResult> LogIn(LogInViewModel model)
        {
            if (ModelState.IsValid)
            {
                User user = new()
                {
                    Email = model.Email,
                    PasswordHash = model.Password,
                };

                var result = await _accountManageService.LogIn(user).ConfigureAwait(false);
                if (result.StatusCode == StatusCodeAccount.OK)
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, result.Data.Id.ToString()),
                        new Claim(ClaimTypes.Email, result.Data.Email),
                        new Claim(ClaimTypes.Name, result.Data.Name)
                    };
                    var principal = new ClaimsPrincipal(new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme));

                    await HttpContext.SignInAsync(principal).ConfigureAwait(false);

                    return new RequestResult(true, null);
                }
                else if (result.StatusCode == StatusCodeAccount.InvalidUserData)
                {
                    ModelState.AddModelError(string.Empty, "Invalid login or password.");
                }
                else if (result.StatusCode == StatusCodeAccount.UserNotVerified)
                {
                    ModelState.AddModelError(string.Empty, "Email is not confirmed.");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "An error has occurred. Please try again later.");
                }
            }

            var errors = ModelState.Where(x => x.Value.ValidationState == ModelValidationState.Invalid).Select(x =>
                new ModelStateError(x.Key, x.Value.Errors.Count > 0 ? x.Value.Errors[0].ErrorMessage : string.Empty)
            );

            return new RequestResult(false, errors);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(ConfirmEmailViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountManageService.ConfirmEmail(model.Id, model.Token).ConfigureAwait(false);
                if (result.StatusCode == StatusCodeAccount.OK)
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, result.Data.Id.ToString()),
                        new Claim(ClaimTypes.Email, result.Data.Email),
                        new Claim(ClaimTypes.Name, result.Data.Name)
                    };
                    var principal = new ClaimsPrincipal(new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme));

                    await HttpContext.SignInAsync(principal).ConfigureAwait(false);

                    return RedirectToAction("Index", "Home");
                }
            }

            return StatusCode(418);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme).ConfigureAwait(false);
            return RedirectToAction("Index", "Home");
        }
    }
}