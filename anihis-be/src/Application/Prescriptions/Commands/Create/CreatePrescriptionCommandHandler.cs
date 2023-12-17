using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace anihis.Application.Prescriptions.Commands.Create;
public class CreatePrescriptionCommandHandler : IRequestHandler<CreatePrescriptionCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Prescription> _prescriptionRepository;
    private readonly IBaseRepository<Manufacturer> _manufacturerRepository;
    private readonly IValidator<CreatePrescriptionCommand> _validator;

    public CreatePrescriptionCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Prescription> prescriptionRepository,
        IBaseRepository<Manufacturer> manufacturerRepository,
        IValidator<CreatePrescriptionCommand> validator
    )
    {
        _context = context;
        _prescriptionRepository = prescriptionRepository;
        _manufacturerRepository = manufacturerRepository;
        _validator = validator;
    }

    public async Task Handle(CreatePrescriptionCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var manufacturer = await _manufacturerRepository.GetByUidOrThrowAsync(request.ManufacturerUid, cancellationToken);
        if (manufacturer == null)
        {
            throw new NotFoundException();
        }

        var prescriptions = await _prescriptionRepository.FindByConditionAync(x => x.Name == request.Name, cancellationToken);
        var prescription = prescriptions.FirstOrDefault();
        if (prescription != null)
        {
            var validationFailure = new ValidationFailure
            {
                ErrorMessage = "A prescription with the same name already exists."
            };

            IEnumerable<ValidationFailure> validationFailures = new List<ValidationFailure> { validationFailure };

            throw new Common.Exceptions.ValidationException(validationFailures);
        }

        _prescriptionRepository.Insert(new Prescription
        {
            AlternateName = request.AlternateName,
            JM = request.JM,
            MainPrice = request.MainPrice,
            Manufacturer = manufacturer,
            Name = request.Name,
            PrescriptionType = request.PrescriptionType,
            SecondPrice = request.SecondPrice,
            SerialNumber = request.SerialNumber,
            Uid = Guid.NewGuid().ToString()
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
