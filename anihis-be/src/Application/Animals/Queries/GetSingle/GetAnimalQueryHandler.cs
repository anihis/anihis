using MediatR;

namespace anihis.Application.Animals.Queries.GetSingle;
public class GetAnimalQueryHandler : IRequestHandler<GetAnimalQuery, GetAnimalResult>
{
    public async Task<GetAnimalResult> Handle(GetAnimalQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
