using MediatR;

namespace anihis.Application.Animals.Queries.GetBreed;
public class GetBreedQuery : IRequest<GetBreedResult>
{
    public string BreedUid { get; set; }
}
