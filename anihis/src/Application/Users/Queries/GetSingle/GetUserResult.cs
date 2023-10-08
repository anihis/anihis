using anihis.Application.Common.Mappings;
using anihis.Domain.Entities;

namespace anihis.Application.Users.Queries.GetSingle;
public class GetUserResult : IMapFrom<User>
{
    public string? Uid { get; set; }
    public string? Name { get; set; }
}
