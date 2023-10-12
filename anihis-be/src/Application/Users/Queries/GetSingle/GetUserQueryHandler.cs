using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.Users.Queries.GetSingle;
public class GetUserQueryHandler : IRequestHandler<GetUserQuery, GetUserResult>
{
    private readonly IBaseRepository<User> _userRepository;

    public GetUserQueryHandler(IBaseRepository<User> userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<GetUserResult> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByUidOrThrowAsync(request.Uid, cancellationToken);
        return new GetUserResult
        {
            Name = user.Name,
            Uid = user.Uid
        };
    }
}
