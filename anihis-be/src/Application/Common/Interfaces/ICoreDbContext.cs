using anihis.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Common.Interfaces;

public interface ICoreDbContext
{
    DbSet<Animal> Animals { get; }
    DbSet<Breed> Breeds { get; }
    DbSet<HealthRecord> HealthRecords { get; }
    DbSet<Owner> Owners { get; }
    DbSet<Species> Species { get; }
    DbSet<User> Users { get; }
    DbSet<Veterinarian> Veterinarians { get; }
    DbSet<VeterinaryClinic> VeterinaryClinics { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
