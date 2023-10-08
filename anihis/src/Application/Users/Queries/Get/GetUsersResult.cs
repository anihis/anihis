using anihis.Application.Common.Mappings;
using anihis.Domain.Entities;

namespace anihis.Application.Users.Queries.Get;
public class GetUsersResult : IMapFrom<User>
{
    public string? Uid { get; set; }
    public string? Name { get; set; }
}
