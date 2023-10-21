using MediatR;

namespace anihis.Application.Animals.Queries.Get;
public class GetAnimalsQuery : IRequest<List<GetAnimalsResult>>
{
}
