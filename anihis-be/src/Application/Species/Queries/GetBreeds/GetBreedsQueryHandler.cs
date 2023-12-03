using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.Species.Queries.GetBreeds;
public class GetBreedsQueryHandler : IRequestHandler<GetBreedsQuery, List<GetBreedsResult>>
{
    private readonly IBaseRepository<Breed> _breedRepository;

    public GetBreedsQueryHandler
    (
        IBaseRepository<Breed> breedRepository
    )
    {
        _breedRepository = breedRepository;
    }

    public async Task<List<GetBreedsResult>> Handle(GetBreedsQuery request, CancellationToken cancellationToken)
    {
        var breeds = _breedRepository.StartQuery();

        return breeds.Select(breed => new GetBreedsResult
        {
            BreedUid = breed.Uid,
            Name = breed.Name,
            SpeciesUid = breed.Species.Uid
        }).ToList();
    }
}
