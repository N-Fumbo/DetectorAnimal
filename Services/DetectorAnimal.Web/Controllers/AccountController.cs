using DetectorAnimal.AccountManager;
using DetectorAnimal.Domain.AccountManager;
using DetectorAnimal.Domain.Entities;
using DetectorAnimal.Web.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DetectorAnimal.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly AccountManagerService _accountManageService;

        public AccountController(AccountManagerService accountManageService) => (_accountManageService) = (accountManageService);


        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public async Task<IActionResult> Registration(RegistrationViewModel model)
        {
            if (ModelState.IsValid)
            {
                User user = new()
                {
                    Name = model.Name,
                    Email = model.Email,
                    PasswordHash = model.Password,
                    IsEmailConfirmed = false
                };

                var result = await _accountManageService.Register(user);

                if (result.StatusCode == StatusCodeAccount.OK)
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, result.Data.Id.ToString()),
                        new Claim(ClaimTypes.Email, result.Data.Email),
                        new Claim(ClaimTypes.Name, result.Data.Name)
                    };
                    var principal = new ClaimsPrincipal(new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme));
                    await HttpContext.SignInAsync(principal);

                    //return Json(new { success = true });
                }
                else if (result.StatusCode == StatusCodeAccount.EmailAlreadyRegistered)
                {
                    ModelState.AddModelError(nameof(model.Email), "Такой email уже зарегистрирован.");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Произошла ошибка. Повторите попытку позже.");
                }
            }
            //var errors = ModelState.Where(x => x.Value.ValidationState == ModelValidationState.Invalid).Select(x => new
            //{
            //    key = x.Key,
            //    errorMessage = x.Value.Errors.Count > 0 ? x.Value.Errors[0].ErrorMessage : string.Empty
            //});

            ////return Json(new { success = false, errors });
            ///
            return RedirectToAction("Index", "Home");
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Home");
        }
    }
}
