using MediatR;

namespace anihis.Application.Users.Queries.Get;
public class GetUsersQuery : IRequest<List<GetUsersResult>>
{
}
