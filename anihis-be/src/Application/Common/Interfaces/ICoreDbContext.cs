using anihis.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Common.Interfaces;

public interface ICoreDbContext
{
    DbSet<Animal> Animals { get; }
    DbSet<Breed> Breeds { get; }
    DbSet<Diagnosis> Diagnoses { get; }
    DbSet<HealthRecord> HealthRecords { get; }
    DbSet<HealthRecordDiagnosis> HealthRecordDiagnoses { get; }
    DbSet<HealthRecordPrescription> HealthRecordPrescriptions { get; }
    DbSet<HealthRecordService> HealthRecordServices { get; }
    DbSet<Manufacturer> Manufacturers { get; }
    //DbSet<Owner> Owners { get; }
    DbSet<Payment> Payments { get; }
    DbSet<Prescription> Prescriptions { get; }
    DbSet<Service> Services { get; }
    DbSet<Species> Species { get; }
    DbSet<User> Users { get; }
    DbSet<Vaccination> Vaccinations { get; }
    //DbSet<Veterinarian> Veterinarians { get; }
    DbSet<VeterinaryClinic> VeterinaryClinics { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
