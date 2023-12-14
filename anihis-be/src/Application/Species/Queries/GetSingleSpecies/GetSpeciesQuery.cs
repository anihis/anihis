using anihis.Application.Species.Queries.GetSingleSpecies;
using MediatR;

namespace anihis.Application.Species.Queries.GetSingleSpecies;
public class GetSpeciesQuery : IRequest<GetSingleSpeciesResult>
{
    public string SpeciesUid { get; set; }
}
