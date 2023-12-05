using anihis.Application.Common.Mappings;
using anihis.Domain.Entities;

namespace anihis.Application.VeterinaryClinics.Queries.GetSingle;
public class GetVeterinaryClinicResult : IMapFrom<VeterinaryClinic>
{
    public string? Uid { get; set; }
    public string? Name { get; set; }
}
