using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.HealthRecords.Commands.CreateDiagnosis;
public class CreateDiagnosisCommandHandler : IRequestHandler<CreateDiagnosisCommand>
{
    private readonly ICoreDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;
    private readonly IBaseRepository<Diagnosis> _diagnosisRepository;
    private readonly IBaseRepository<Service> _serviceRepository;
    private readonly IValidator<CreateDiagnosisCommand> _validator;

    public CreateDiagnosisCommandHandler
    (
        ICoreDbContext context,
        ICurrentUserService currentUserService,
        IBaseRepository<Veterinarian> veterinarianRepository,
        IBaseRepository<Diagnosis> diagnosisRepository,
        IBaseRepository<Service> serviceRepository,
        IValidator<CreateDiagnosisCommand> validator
    )
    {
        _context = context;
        _currentUserService = currentUserService;
        _veterinarianRepository = veterinarianRepository;
        _diagnosisRepository = diagnosisRepository;
        _serviceRepository = serviceRepository;
        _validator = validator;
    }

    public async Task Handle(CreateDiagnosisCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var veterinarian = await _veterinarianRepository.StartQuery()
            .Include(x => x.VeterinaryClinic)
            .Where(x => x.Uid == _currentUserService.UserUid)
            .SingleOrDefaultAsync(cancellationToken);

        await _diagnosisRepository.ThrowIfConflict(x =>
            x.Name.ToLower() == request.Name.ToLower() && x.VeterinaryClinic == veterinarian.VeterinaryClinic,
            cancellationToken);

        var diagnosesNumber = _diagnosisRepository.StartQuery()
            .Where(x => x.VeterinaryClinic == veterinarian.VeterinaryClinic).Count();

        var servicesNumber = _serviceRepository.StartQuery()
            .Where(x => x.VeterinaryClinic == veterinarian.VeterinaryClinic).Count();

        _diagnosisRepository.Insert(new Diagnosis
        {
            Uid = Guid.NewGuid().ToString(),
            Code = diagnosesNumber + servicesNumber + 1,
            DiagnosisType = request.DiagnosisType,
            Name = request.Name,
            VeterinaryClinic = veterinarian.VeterinaryClinic
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
