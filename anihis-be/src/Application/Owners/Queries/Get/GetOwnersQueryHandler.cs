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
        var owners = _ownerRepository.StartQuery();
        return owners.Select(owner => new GetOwnersResult
        {
            Email = owner.Email,
            FirstName = owner.FirstName,
            LastName = owner.LastName,
            Uid = owner.Uid
        }).ToList();
    }
}
