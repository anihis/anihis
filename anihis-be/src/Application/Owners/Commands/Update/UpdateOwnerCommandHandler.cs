using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Application.Owners.Commands.Create;
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
        IBaseRepository<Owner> ownerRepository
    )
    {
        _context = context;
        _ownerRepository = ownerRepository;
    }

    public async Task Handle(UpdateOwnerCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var owner = await _ownerRepository.GetByUidOrThrowAsync(request.OwnerUid, cancellationToken);
        if (owner is null)
        {
            throw new NotFoundException();
        }

        owner.Address = request.Address;
        owner.City = request.City;
        owner.Country = request.Country;
        owner.Email = request.Email;
        owner.FirstName = request.FirstName;
        owner.LastName = request.LastName;
        owner.IdCardNumber = request.IdCardNumber;
        owner.MobileNumber = request.MobileNumber;
        owner.PassportNumber = request.PassportNumber;
        owner.PersonalNumber = request.PersonalNumber;
        owner.PhoneNumber = request.PhoneNumber;
        owner.PostalCode = request.PostalCode;
        owner.LastModifiedDateTimeUtc = DateTime.UtcNow;
        _ownerRepository.Update(owner);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
