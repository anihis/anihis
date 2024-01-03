using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Animals.Queries.GetSingleSpecies;
public class GetSingleSpeciesQueryHandler : IRequestHandler<GetSingleSpeciesQuery, GetSingleSpeciesResult>
{
    private readonly IBaseRepository<Species> _speciesRepository;
    private readonly IBaseRepository<Breed> _breedRepository;

    public GetSingleSpeciesQueryHandler
    (
        IBaseRepository<Species> speciesRepository,
        IBaseRepository<Breed> breedRepository
    )
    {
        _speciesRepository = speciesRepository;
        _breedRepository = breedRepository;
    }

    public async Task<GetSingleSpeciesResult> Handle(GetSingleSpeciesQuery request, CancellationToken cancellationToken)
    {
        var species = await _speciesRepository.GetByUidOrThrowAsync(request.SpeciesUid, cancellationToken);

        var breeds = await _breedRepository.StartQuery()
            .Where(x => x.Species == species)
            .ToListAsync(cancellationToken);

        return new GetSingleSpeciesResult
        {
            Uid = species.Uid,
            Name = species.Name,
            Breeds = breeds.Select(breed => new Common.Models.Breed
            {
                Name = breed.Name,
                Uid = breed.Uid
            }).ToList()
        };
    }
}
