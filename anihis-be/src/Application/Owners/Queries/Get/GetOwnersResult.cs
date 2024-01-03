using anihis.Application.Common.Mappings;
using anihis.Domain.Entities;

namespace anihis.Application.Owners.Queries.Get;
public class GetOwnersResult : IMapFrom<Owner>
{
    public string? Uid { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? Email { get; set; }
}
