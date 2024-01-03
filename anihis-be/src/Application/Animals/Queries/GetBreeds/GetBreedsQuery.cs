using MediatR;

namespace anihis.Application.Animals.Queries.GetBreeds;
public class GetBreedsQuery : IRequest<List<GetBreedsResult>>
{
}
