using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;

namespace anihis.Application.Owners.Commands.Create;
public class CreateOwnerCommandHandler : IRequestHandler<CreateOwnerCommand>
{
    private readonly ICoreDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<Owner> _ownerRepository;
    private readonly IValidator<CreateOwnerCommand> _validator;

    public CreateOwnerCommandHandler
    (
        ICoreDbContext context,
        ICurrentUserService currentUserService,
        IBaseRepository<Owner> ownerRepository,
        IValidator<CreateOwnerCommand> validator
    )
    {
        _context = context;
        _currentUserService = currentUserService;
        _ownerRepository = ownerRepository;
        _validator = validator;
    }

    public async Task Handle(CreateOwnerCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        await _ownerRepository.ThrowIfConflict(x =>
            x.FirstName.ToLower() == request.FirstName.ToLower() && 
            x.LastName.ToLower() == request.LastName.ToLower() &&
            x.City.ToLower() == request.City.ToLower() &&
            x.Address.ToLower() == request.Address.ToLower(),
            cancellationToken);

        _ownerRepository.Insert(new Owner
        {
            Uid = Guid.NewGuid().ToString(),
            //Username = request.Username,
            Address = request.Address,
            City = request.City,
            Country = request.Country,
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            IdCardNumber = request.IdCardNumber,
            MobileNumber = request.MobileNumber,
            PassportNumber = request.PassportNumber,
            PersonalNumber = request.PersonalNumber,
            PhoneNumber = request.PhoneNumber,
            PostalCode = request.PostalCode,
            UnpaidExpenses = 0,
            LastModifiedDateTimeUtc = DateTime.UtcNow
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
