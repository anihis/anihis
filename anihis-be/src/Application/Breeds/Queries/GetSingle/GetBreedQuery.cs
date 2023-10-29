using MediatR;

namespace anihis.Application.Breeds.Queries.GetSingle;
public class GetBreedQuery : IRequest<GetBreedResult>
{
    public string BreedUid { get; set; }
}
