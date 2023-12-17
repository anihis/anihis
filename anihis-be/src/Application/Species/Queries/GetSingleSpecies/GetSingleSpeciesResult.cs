using anihis.Application.Common.Mappings;
using anihis.Application.Common.Models;

namespace anihis.Application.Species.Queries.GetSingleSpecies;
public class GetSingleSpeciesResult /*: IMapFrom<Domain.Entities.Species>*/
{
    public string Uid { get; set; }
    public string Name { get; set; }
    public List<Breed> Breeds { get; set; }
}
