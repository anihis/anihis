using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.HealthRecords.Commands.CreateService;
public class CreateServiceCommandHandler : IRequestHandler<CreateServiceCommand>
{
    private readonly ICoreDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;
    private readonly IBaseRepository<Diagnosis> _diagnosisRepository;
    private readonly IBaseRepository<Service> _serviceRepository;
    private readonly IValidator<CreateServiceCommand> _validator;

    public CreateServiceCommandHandler
    (
        ICoreDbContext context,
        ICurrentUserService currentUserService,
        IBaseRepository<Veterinarian> veterinarianRepository,
        IBaseRepository<Diagnosis> diagnosisRepository,
        IBaseRepository<Service> serviceRepository,
        IValidator<CreateServiceCommand> validator
    )
    {
        _context = context;
        _currentUserService = currentUserService;
        _veterinarianRepository = veterinarianRepository;
        _diagnosisRepository = diagnosisRepository;
        _serviceRepository = serviceRepository;
        _validator = validator;
    }

    public async Task Handle(CreateServiceCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var veterinarian = await _veterinarianRepository.StartQuery()
            .Include(x => x.VeterinaryClinic)
            .Where(x => x.Uid == _currentUserService.UserUid)
            .SingleOrDefaultAsync(cancellationToken);

        await _serviceRepository.ThrowIfConflict(x =>
            x.Name.ToLower() == request.Name.ToLower() && x.VeterinaryClinic == veterinarian.VeterinaryClinic, 
            cancellationToken);

        //TODO: move to extensions
        var diagnosesNumber = _diagnosisRepository.StartQuery()
            .Where(x => x.VeterinaryClinic == veterinarian.VeterinaryClinic).Count();

        var servicesNumber = _serviceRepository.StartQuery()
            .Where(x => x.VeterinaryClinic == veterinarian.VeterinaryClinic).Count();

        _serviceRepository.Insert(new Service
        {
            Uid = Guid.NewGuid().ToString(),
            Code = diagnosesNumber + servicesNumber + 1,
            Name = request.Name,
            VeterinaryClinic = veterinarian.VeterinaryClinic
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
