using System.Reflection;
using anihis.Application.Common.Interfaces;
using anihis.Infrastructure.Persistence;
using anihis.WebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Logging;
using WebAPI;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddWebAPIServices(this IServiceCollection services)
    {
        services.AddDatabaseDeveloperPageExceptionFilter();

        services.AddScoped<ICurrentUserService, CurrentUserService>();

        services.AddHttpContextAccessor();

        services.AddHealthChecks()
            .AddDbContextCheck<CoreDbContext>();

        services.AddControllersWithViews();

        services.AddRazorPages();

        // Customise default API behaviour
        services.Configure<ApiBehaviorOptions>(options =>
            options.SuppressModelStateInvalidFilter = true);

        services.AddOpenAPI();
        IdentityModelEventSource.ShowPII = true; //REVIEW: this looks like security risk - we should at least execute conditionally for Development environment ONLY

        var assembly = Assembly.GetExecutingAssembly();
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(assembly));

        return services;
    }
}
