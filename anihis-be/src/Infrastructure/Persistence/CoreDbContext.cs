using System.Reflection;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using anihis.Infrastructure.Persistence.Interceptors;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Infrastructure.Persistence;

public class CoreDbContext : DbContext, ICoreDbContext
{
    private readonly IMediator _mediator;
    private readonly AuditableEntitySaveChangesInterceptor _auditableEntitySaveChangesInterceptor;

    public CoreDbContext(
        DbContextOptions<CoreDbContext> options,
        IMediator mediator,
        AuditableEntitySaveChangesInterceptor auditableEntitySaveChangesInterceptor)
        : base(options)
    {
        _mediator = mediator;
        _auditableEntitySaveChangesInterceptor = auditableEntitySaveChangesInterceptor;
    }

    public DbSet<Animal> Animals => Set<Animal>();
    public DbSet<Breed> Breeds => Set<Breed>();
    public DbSet<Diagnosis> Diagnoses => Set<Diagnosis>();
    public DbSet<HealthRecord> HealthRecords => Set<HealthRecord>();
    public DbSet<HealthRecordDiagnosis> HealthRecordDiagnoses => Set<HealthRecordDiagnosis>();
    public DbSet<HealthRecordPrescription> HealthRecordPrescriptions => Set<HealthRecordPrescription>();
    public DbSet<HealthRecordService> HealthRecordServices => Set<HealthRecordService>();
    public DbSet<Manufacturer> Manufacturers => Set<Manufacturer>();
    //public DbSet<Owner> Owners => Set<Owner>();
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<Prescription> Prescriptions => Set<Prescription>();
    public DbSet<Service> Services => Set<Service>();
    public DbSet<Species> Species => Set<Species>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Vaccination> Vaccinations => Set<Vaccination>();
    //public DbSet<Veterinarian> Veterinarians => Set<Veterinarian>();
    public DbSet<VeterinaryClinic> VeterinaryClinics => Set<VeterinaryClinic>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(_auditableEntitySaveChangesInterceptor);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        await _mediator.DispatchDomainEvents(this);

        return await base.SaveChangesAsync(cancellationToken);
    }
}
