using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using DetectorAnimal.Web.Models;
using Microsoft.AspNetCore.Authorization;
using DetectorAnimal.Data.Context;

namespace DetectorAnimal.Web.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(AppDbContext context, ILogger<HomeController> logger)
        {
            //context.Database.EnsureDeleted();
            //context.Database.EnsureCreated();
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}