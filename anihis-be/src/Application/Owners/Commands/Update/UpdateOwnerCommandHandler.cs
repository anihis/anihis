using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;

namespace anihis.Application.Owners.Commands.Update;
public class UpdateOwnerCommandHandler : IRequestHandler<UpdateOwnerCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Owner> _ownerRepository;
    private IValidator<UpdateOwnerCommand> _validator;

    public UpdateOwnerCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Owner> ownerRepository,
        IValidator<UpdateOwnerCommand> validator
    )
    {
        _context = context;
        _ownerRepository = ownerRepository;
        _validator = validator;
    }

    public async Task Handle(UpdateOwnerCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        await _ownerRepository.ThrowIfConflict(x =>
            x.FirstName.ToLower() == request.FirstName.ToLower() &&
            x.LastName.ToLower() == request.LastName.ToLower() &&
            x.City.ToLower() == request.City.ToLower() &&
            x.Address.ToLower() == request.Address.ToLower(),
            cancellationToken);

        var owner = await _ownerRepository.GetByUidOrThrowAsync(request.OwnerUid, cancellationToken);

        owner.Address = string.IsNullOrEmpty(request.Address) ? owner.Address : request.Address;
        owner.City = string.IsNullOrEmpty(request.City) ? owner.City : request.City;
        owner.Country = request.Country;
        owner.Email = request.Email;
        owner.FirstName = string.IsNullOrEmpty(request.FirstName) ? owner.FirstName : request.FirstName;
        owner.LastName = string.IsNullOrEmpty(request.LastName) ? owner.LastName : request.LastName;
        owner.IdCardNumber = request.IdCardNumber;
        owner.MobileNumber = request.MobileNumber;
        owner.PassportNumber = request.PassportNumber;
        owner.PersonalNumber = request.PersonalNumber;
        owner.PhoneNumber = request.PhoneNumber;
        owner.PostalCode = request.PostalCode;
        owner.Warning = request.Warning;
        owner.LastModifiedDateTimeUtc = DateTime.UtcNow;
        _ownerRepository.Update(owner);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
