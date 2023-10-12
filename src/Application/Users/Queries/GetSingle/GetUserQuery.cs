using MediatR;

namespace anihis.Application.Users.Queries.GetSingle;
public class GetUserQuery : IRequest<GetUserResult>
{
    public string? Uid { get; set; }
}
