using MediatR;

namespace anihis.Application.Animals.Queries.GetSingleSpecies;
public class GetSingleSpeciesQuery : IRequest<GetSingleSpeciesResult>
{
    public string SpeciesUid { get; set; }
}
