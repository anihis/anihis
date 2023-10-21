using MediatR;

namespace anihis.Application.Animals.Queries.Get;
public class GetAnimalsQueryHandler : IRequestHandler<GetAnimalsQuery, List<GetAnimalsResult>>
{
    public async Task<List<GetAnimalsResult>> Handle(GetAnimalsQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
