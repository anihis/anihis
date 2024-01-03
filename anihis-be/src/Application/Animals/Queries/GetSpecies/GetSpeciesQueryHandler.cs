using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Animals.Queries.GetSpecies;
public class GetSpeciesQueryHandler : IRequestHandler<GetSpeciesQuery, GetSpeciesResult>
{
    private readonly IBaseRepository<Species> _speciesRepository;
    private readonly IBaseRepository<Breed> _breedRepository;

    public GetSpeciesQueryHandler
    (
        IBaseRepository<Species> speciesRepository,
        IBaseRepository<Breed> breedRepository
    )
    {
        _speciesRepository = speciesRepository;
        _breedRepository = breedRepository;
    }

    public async Task<GetSpeciesResult> Handle(GetSpeciesQuery request, CancellationToken cancellationToken)
    {
        List<Common.Models.Species> result = new();
        var species = _speciesRepository.StartQuery();

        foreach (var s in species)
        {
            var breeds = await _breedRepository.StartQuery()
                .Where(x => x.Species == s)
                .ToListAsync(cancellationToken);

            result.Add(new Common.Models.Species
            {
                Breeds = breeds.Select(breed => new Common.Models.Breed
                {
                    Name = breed.Name,
                    Uid = breed.Uid
                }).ToList(),
                Name = s.Name,
                Uid = s.Uid
            });
        }

        return new GetSpeciesResult
        {
            Species = result
        };
    }
}
