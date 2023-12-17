using anihis.Application.Common.Mappings;
using anihis.Domain.Entities;

namespace anihis.Application.Species.Queries.GetBreeds;
public class GetBreedsResult /*: IMapFrom<Breed>*/
{
    public string BreedUid { get; set; }
    public string Name { get; set; }
    public string SpeciesUid { get; set; }
}
