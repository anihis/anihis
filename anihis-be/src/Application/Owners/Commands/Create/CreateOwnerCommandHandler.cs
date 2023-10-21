using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.Owners.Commands.Create;
public class CreateOwnerCommandHandler : IRequestHandler<CreateOwnerCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Owner> _ownerRepository;

    public CreateOwnerCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Owner> ownerRepository
    )
    {
        _context = context;
        _ownerRepository = ownerRepository;
    }

    public async Task Handle(CreateOwnerCommand request, CancellationToken cancellationToken)
    {
        _ownerRepository.Insert(new Owner
        {
            Uid = Guid.NewGuid().ToString(),
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
            PostalCode = request.PostalCode
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
