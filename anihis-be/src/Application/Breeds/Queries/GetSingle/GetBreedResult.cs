using anihis.Application.Common.Mappings;
using anihis.Domain.Entities;

namespace anihis.Application.Breeds.Queries.GetSingle;
public class GetBreedResult : IMapFrom<Breed>
{
    public string BreedUid { get; set; }
    public string Name { get; set; }
    public string SpeciesUid { get; set; }
}
