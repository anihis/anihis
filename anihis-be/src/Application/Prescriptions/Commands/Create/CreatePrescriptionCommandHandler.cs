using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Prescriptions.Commands.Create;
public class CreatePrescriptionCommandHandler : IRequestHandler<CreatePrescriptionCommand>
{
    private readonly ICoreDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<Prescription> _prescriptionRepository;
    private readonly IBaseRepository<Manufacturer> _manufacturerRepository;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;
    private readonly IBaseRepository<Diagnosis> _diagnosisRepository;
    private readonly IBaseRepository<Service> _serviceRepository;
    private readonly IValidator<CreatePrescriptionCommand> _validator;

    public CreatePrescriptionCommandHandler
    (
        ICoreDbContext context,
        ICurrentUserService currentUserService,
        IBaseRepository<Prescription> prescriptionRepository,
        IBaseRepository<Manufacturer> manufacturerRepository,
        IBaseRepository<Veterinarian> veterinarianRepository,
        IBaseRepository<Diagnosis> diagnosisRepository,
        IBaseRepository<Service> serviceRepository,
        IValidator<CreatePrescriptionCommand> validator
    )
    {
        _context = context;
        _currentUserService = currentUserService;
        _prescriptionRepository = prescriptionRepository;
        _manufacturerRepository = manufacturerRepository;
        _veterinarianRepository = veterinarianRepository;
        _diagnosisRepository = diagnosisRepository;
        _serviceRepository = serviceRepository;
        _validator = validator;
    }

    public async Task Handle(CreatePrescriptionCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var manufacturer = await _manufacturerRepository.GetByUidOrThrowAsync(request.ManufacturerUid, cancellationToken);

        var veterinarian = await _veterinarianRepository.StartQuery()
            .Include(x => x.VeterinaryClinic)
            .Where(x => x.Uid == _currentUserService.UserUid)
            .SingleOrDefaultAsync(cancellationToken);

        await _prescriptionRepository.ThrowIfConflict(x =>
            x.Name.ToLower() == request.Name.ToLower() && x.VeterinaryClinic == veterinarian.VeterinaryClinic,
            cancellationToken);

        var diagnosesNumber = _diagnosisRepository.StartQuery()
            .Where(x => x.VeterinaryClinic == veterinarian.VeterinaryClinic).Count();

        var servicesNumber = _serviceRepository.StartQuery()
            .Where(x => x.VeterinaryClinic == veterinarian.VeterinaryClinic).Count();

        _prescriptionRepository.Insert(new Prescription
        {
            AlternateName = request.AlternateName,
            JM = request.JM,
            MainPrice = request.MainPrice,
            Manufacturer = manufacturer,
            Name = request.Name,
            PrescriptionType = request.PrescriptionType,
            SecondPrice = request.SecondPrice,
            Code = diagnosesNumber + servicesNumber + 1,
            Uid = Guid.NewGuid().ToString(),
            VeterinaryClinic = veterinarian.VeterinaryClinic
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
