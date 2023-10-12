using anihis.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Common.Interfaces;

public interface ICoreDbContext
{
    DbSet<User> Users { get; }
    DbSet<Owner> Owners { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
