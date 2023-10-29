using MediatR;

namespace anihis.Application.Species.Queries.GetSingle;
public class GetSpeciesQuery : IRequest<GetSpeciesResult>
{
    public string SpeciesUid { get; set; }
}
