using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace anihis.Application.Manufacturers.Command.Create;
public class CreateManufacturerCommandHandler : IRequestHandler<CreateManufacturerCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Manufacturer> _manufacturerRepository;
    private readonly IValidator<CreateManufacturerCommand> _validator;

    public CreateManufacturerCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Manufacturer> manufacturerRepository,
        IValidator<CreateManufacturerCommand> validator
    )
    {
        _context = context;
        _manufacturerRepository = manufacturerRepository;
        _validator = validator;
    }

    public async Task Handle(CreateManufacturerCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        //var manufacturer = await _manufacturerRepository.StartQuery()
        //    .Where(x => x.Name == request.Name)
        //    .SingleOrDefaultAsync(cancellationToken);

        var manufacturers = await _manufacturerRepository.FindByConditionAync(x => x.Name == request.Name, cancellationToken);
        var manufacturer = manufacturers.FirstOrDefault();

        if (manufacturer != null)
        {
            var validationFailure = new ValidationFailure
            {
                ErrorMessage = "A manufacturer with the same name already exists."
            };

            IEnumerable<ValidationFailure> validationFailures = new List<ValidationFailure> { validationFailure };

            throw new ValidationException(validationFailures);
        }

        _manufacturerRepository.Insert(new Manufacturer
        {
            Address = request.Address,
            BankAccount = request.BankAccount,
            City = request.City,
            ContactPerson = request.ContactPerson,
            MobileNumber = request.MobileNumber,
            Name = request.Name,
            PhoneNumber = request.PhoneNumber,
            Uid = Guid.NewGuid().ToString()
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
