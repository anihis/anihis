using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.Owners.Queries.Get;
public class GetOwnersQueryHandler : IRequestHandler<GetOwnersQuery, List<GetOwnersResult>>
{
    private readonly IBaseRepository<Owner> _ownerRepository;

    public GetOwnersQueryHandler(IBaseRepository<Owner> ownerRepository)
    {
        _ownerRepository = ownerRepository;
    }

    public async Task<List<GetOwnersResult>> Handle(GetOwnersQuery request, CancellationToken cancellationToken)
    {
        var owners = _ownerRepository.GetQuery();
        return owners.Select(owner => new GetOwnersResult
        {
            Address = owner.Address,
            City = owner.City,
            Country = owner.Country,
            Email = owner.Email,
            FirstName = owner.FirstName,
            LastName = owner.LastName,
            IdCardNumber = owner.IdCardNumber,
            MobileNumber = owner.MobileNumber,
            PassportNumber = owner.PassportNumber,
            PersonalNumber = owner.PersonalNumber,
            PhoneNumber = owner.PhoneNumber,
            PostalCode = owner.PostalCode,
            Uid = owner.Uid
        }).ToList();
    }
}
