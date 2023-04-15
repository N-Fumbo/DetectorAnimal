using AnimalRecognition.AccountManager;
using AnimalRecognition.Dal.Context;
using AnimalRecognition.Dal.Repositories;
using AnimalRecognition.Dal.Repositories.Base;
using AnimalRecognition.Detect;
using AnimalRecognition.Domain.Entities;
using AnimalRecognition.MailService;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
     ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

var mailServiceSettings = builder.Configuration.GetSection("MailServiceSettings");

if (!mailServiceSettings.Exists()) throw new InvalidOperationException("section 'MailServiceSettings' not found.");

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(connectionString, m => m.MigrationsAssembly("DetectorAnimal.PgSql"));
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

builder.Services.AddSingleton<ImageRecognition>();

builder.Services.Configure<EmailServiceSettings>(mailServiceSettings);
builder.Services.AddScoped<EmailService>();

builder.Services.AddScoped<DbRepository<EmailConfirmation>>();
builder.Services.AddScoped<UserRepository<User>>();
builder.Services.AddScoped<AccountManagerService>();

builder.Services.AddLogging(loggingBuilder =>
{
    loggingBuilder.AddSeq("http://localhost:5341");
});

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Cookie.SameSite = SameSiteMode.Strict;
        options.LoginPath = "/Home/Index";
        options.LogoutPath = "/Home/Index";
        options.AccessDeniedPath = "/Home/Index";
        options.SlidingExpiration = false;
        options.ExpireTimeSpan = TimeSpan.FromHours(6);
    });

builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});

builder.Services.AddControllersWithViews(configure =>
{
    var policy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();

    configure.Filters.Add(new AuthorizeFilter(policy));
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.Use(async (context, next) =>
{
    context.Response.Headers.Add("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'");
    await next.Invoke();
});

app.MapControllerRoute(
    name: "ConfirmEmail",
    pattern: "{Account}/{ConfirmEmail}/{id:int}/{token:length(36)}",
    defaults: new { controller = "Account", action = "ConfirmEmail" });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}");

app.Run();
