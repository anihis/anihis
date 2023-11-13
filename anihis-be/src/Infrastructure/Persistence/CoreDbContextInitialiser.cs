using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace anihis.Infrastructure.Persistence;
public class CoreDbContextInitialiser
{
    private readonly ILogger<CoreDbContextInitialiser> _logger;
    private readonly CoreDbContext _context;

    public CoreDbContextInitialiser(ILogger<CoreDbContextInitialiser> logger, CoreDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task InitialiseAsync()
    {
        //try
        //{
        //    if (_context.Database.IsSqlite())
        //    {
        //        await _context.Database.MigrateAsync();
        //    }
        //}
        //catch (Exception ex)
        //{
        //    _logger.LogError(ex, "An error occurred while initialising the database.");
        //    throw;
        //}
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task TrySeedAsync()
    {
        // Default data
        // Seed, if necessary
    }
}
