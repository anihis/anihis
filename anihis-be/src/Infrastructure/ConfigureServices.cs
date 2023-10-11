using anihis.Application.Common.Interfaces;
using anihis.Infrastructure.Identity;
using anihis.Infrastructure.Persistence;
using anihis.Infrastructure.Persistence.Interceptors;
using anihis.Infrastructure.Services;
using Keycloak.AuthServices.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
    {
        services.AddScoped<AuditableEntitySaveChangesInterceptor>();

        var connectionString = configuration.GetConnectionString("CoreDbContext");
        var coreDbContextOptionsBuilder = new Action<DbContextOptionsBuilder>(options => options.UseSqlite(connectionString));
        services.AddDbContext<CoreDbContext>(coreDbContextOptionsBuilder)
                .AddScoped<ICoreDbContext, CoreDbContext>();

        services.AddTransient<IDateTime, DateTimeService>();
        services.AddTransient<IIdentityService, IdentityService>();

        services.AddKeycloakAuthentication(configuration);

        //TODO: Keyclock Authorization
        services.AddAuthorization(options =>
            options.AddPolicy("CanPurge", policy => policy.RequireRole("Administrator")));

        return services;
    }
}
