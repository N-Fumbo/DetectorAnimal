using DetectorAnimal.Dal.Context;
using DetectorAnimal.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        var model = new IndexViewModel() { Login = new(), Register = new(), Detect = new() };
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