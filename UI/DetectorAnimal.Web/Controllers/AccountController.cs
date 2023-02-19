using DetectorAnimal.Data.Entities;
using DetectorAnimal.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DetectorAnimal.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;

        private readonly SignInManager<User> _signInManager;

        
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (await _userManager.FindByNameAsync(model.UserName) is null)
                {
                    if (await _userManager.FindByEmailAsync(model.Email) is null)
                    {
                        User user = new()
                        {
                            FirstName = model.FirstName,
                            LastName = model.LastName,
                            UserName = model.UserName,
                            Email = model.Email
                        };

                        var result = await _userManager.CreateAsync(user, model.Password);

                        if (result.Succeeded)
                        {
                            await _signInManager.SignInAsync(user, isPersistent: false);
                            return RedirectToAction("Index", "Home");
                        }
                    }
                    else
                    {
                        ModelState.AddModelError(model.Email, "Такой email уже зарегистрирован.");
                    }
                }
                else
                {
                    ModelState.AddModelError(model.UserName, "Такой логин уже существует.");
                }
            }

            return View(model);
        }
    }
}