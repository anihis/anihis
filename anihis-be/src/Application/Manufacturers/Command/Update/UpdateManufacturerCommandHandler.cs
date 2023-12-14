using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace anihis.Application.Manufacturers.Command.Update;
public class UpdateManufacturerCommandHandler : IRequestHandler<UpdateManufacturerCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Manufacturer> _manufacturerRepository;
    private readonly IValidator<UpdateManufacturerCommand> _validator;

    public UpdateManufacturerCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Manufacturer> manufacturerRepository,
        IValidator<UpdateManufacturerCommand> validator
    )
    {
        _context = context;
        _manufacturerRepository = manufacturerRepository;
        _validator = validator;
    }

    public async Task Handle(UpdateManufacturerCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var manufacturer = await _manufacturerRepository.GetByUidOrThrowAsync(request.ManufacturerUid, cancellationToken);
        if (manufacturer == null)
        {
            throw new NotFoundException();
        }

        if (manufacturer.Name == request.Name)
        {
            var validationFailure = new ValidationFailure
            {
                ErrorMessage = "A manufacturer with the same name already exists."
            };

            IEnumerable<ValidationFailure> validationFailures = new List<ValidationFailure> { validationFailure };

            throw new Common.Exceptions.ValidationException(validationFailures);
        }

        manufacturer.Address = request.Address;
        manufacturer.BankAccount = request.BankAccount;
        manufacturer.City = request.City;
        manufacturer.ContactPerson = request.ContactPerson;
        manufacturer.MobileNumber = request.MobileNumber;
        manufacturer.Name = string.IsNullOrEmpty(request.Name) ? manufacturer.Name : request.Name;
        manufacturer.PhoneNumber = request.PhoneNumber;
        _manufacturerRepository.Update(manufacturer);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
