using MediatR;

namespace anihis.Application.Breeds.Queries.Get;
public class GetBreedsQuery : IRequest<List<GetBreedsResult>>
{
}
