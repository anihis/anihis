using anihis.Application.Common.Mappings;
using anihis.Domain.Entities;

namespace anihis.Application.VeterinaryClinics.Queries.Get;
public class GetVeterinaryClinicsResult : IMapFrom<VeterinaryClinic>
{
    public string? Uid { get; set; }
    public string? Name { get; set; }
}
