using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.Owners.Queries.GetSingle;
public class GetOwnerQueryHandler : IRequestHandler<GetOwnerQuery, GetOwnerResult>
{
    private readonly IBaseRepository<Owner> _ownerRepository;

    public GetOwnerQueryHandler(IBaseRepository<Owner> ownerRepository)
    {
        _ownerRepository = ownerRepository;
    }

    public async Task<GetOwnerResult> Handle(GetOwnerQuery request, CancellationToken cancellationToken)
    {
        var owner = await _ownerRepository.GetByUidOrThrowAsync(request.Uid, cancellationToken);
        return new GetOwnerResult
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
            Uid = owner.Uid,
            UnpaidExpenses = owner.UnpaidExpenses,
            Warning = owner.Warning
        };
    }
}
