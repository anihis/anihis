using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace anihis.Application.Prescriptions.Commands.Update;
public class UpdatePrescriptionCommandHandler : IRequestHandler<UpdatePrescriptionCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Prescription> _prescriptionRepository;
    private readonly IBaseRepository<Manufacturer> _manufacturerRepository;
    private readonly IValidator<UpdatePrescriptionCommand> _validator;

    public UpdatePrescriptionCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Prescription> prescriptionRepository,
        IBaseRepository<Manufacturer> manufacturerRepository,
        IValidator<UpdatePrescriptionCommand> validator
    )
    {
        _context = context;
        _prescriptionRepository = prescriptionRepository;
        _manufacturerRepository = manufacturerRepository;
        _validator = validator;
    }

    public async Task Handle(UpdatePrescriptionCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var prescription = await _prescriptionRepository.GetByUidOrThrowAsync(request.PrescriptionUid, cancellationToken);
        if (prescription == null)
        {
            throw new NotFoundException();
        }

        if (prescription.Name == request.Name)
        {
            var validationFailure = new ValidationFailure
            {
                ErrorMessage = "A prescription with the same name already exists."
            };

            IEnumerable<ValidationFailure> validationFailures = new List<ValidationFailure> { validationFailure };

            throw new Common.Exceptions.ValidationException(validationFailures);
        }

        var manufacturer = await _manufacturerRepository.GetByUidOrThrowAsync(request.ManufacturerUid, cancellationToken);

        prescription.AlternateName = request.AlternateName;
        prescription.JM = request.JM;
        prescription.MainPrice = string.IsNullOrEmpty(request.MainPrice) ? prescription.MainPrice : request.MainPrice;
        prescription.Manufacturer = manufacturer == null ? prescription.Manufacturer : manufacturer;
        prescription.Name = string.IsNullOrEmpty(request.Name) ? prescription.Name : request.Name;
        prescription.PrescriptionType = prescription.PrescriptionType;
        prescription.SecondPrice = prescription.SecondPrice;
        prescription.SerialNumber = prescription.SerialNumber;
        _prescriptionRepository.Update(prescription);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
