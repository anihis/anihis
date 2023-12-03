using MediatR;

namespace anihis.Application.Species.Queries.GetBreed;
public class GetBreedQuery : IRequest<GetBreedResult>
{
    public string BreedUid { get; set; }
}
