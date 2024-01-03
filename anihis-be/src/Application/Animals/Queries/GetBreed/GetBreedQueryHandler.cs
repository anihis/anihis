using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Animals.Queries.GetBreed;
public class GetBreedQueryHandler : IRequestHandler<GetBreedQuery, GetBreedResult>
{
    private readonly IBaseRepository<Breed> _breedRepository;

    public GetBreedQueryHandler
    (
        IBaseRepository<Breed> breedRepository
    )
    {
        _breedRepository = breedRepository;
    }

    public async Task<GetBreedResult> Handle(GetBreedQuery request, CancellationToken cancellationToken)
    {
        var breed = await _breedRepository.StartQuery()
            .Include(x => x.Species)
            .Where(x => x.Uid == request.BreedUid)
            .SingleOrDefaultAsync(cancellationToken);

        if (breed is null)
        {
            throw new NotFoundException();
        }

        return new GetBreedResult
        {
            BreedUid = breed.Uid,
            Name = breed.Name,
            SpeciesUid = breed.Species.Uid
        };
    }
}
