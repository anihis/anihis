using anihis.Application.Common.Mappings;

namespace anihis.Application.Species.Queries;
public class GetSpeciesResult : IMapFrom<Domain.Entities.Species>
{
    public string SpeciesUid { get; set; }
    public string Name { get; set; }
}
