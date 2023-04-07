using DetectorAnimal.AccountManager;
using DetectorAnimal.Dal.Context;
using DetectorAnimal.MailService;
using DetectorAnimal.Web.Models.AccountModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DetectorAnimal.Web.Controllers;

[AllowAnonymous]
public class HomeController : Controller
{
    private readonly AppDbContext _context;

    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger, AppDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public IActionResult Index()
    {
        var model = new AuthViewModel() { LogIn = new(), Register = new() };
        return View(model);
    }

    [HttpPost]
    public IActionResult Drop()
    {
        _context.Database.EnsureDeleted();
        _context.Database.EnsureCreated();

        return RedirectToAction("Index");
    }
}