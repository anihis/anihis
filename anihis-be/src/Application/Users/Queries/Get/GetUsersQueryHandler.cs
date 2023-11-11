using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.Users.Queries.Get;
public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, List<GetUsersResult>>
{
    private readonly IBaseRepository<User> _userRepository;

    public GetUsersQueryHandler(IBaseRepository<User> userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<List<GetUsersResult>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        var users = _userRepository.StartQuery();
        return users.Select(user => new GetUsersResult
        {
            Name = user.Name,
            Uid = user.Uid
        }).ToList();
    }
}
