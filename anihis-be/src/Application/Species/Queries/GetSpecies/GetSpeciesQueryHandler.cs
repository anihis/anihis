using anihis.Application.Common.Interfaces;
using anihis.Application.Species.Queries.GetSpecies;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Species.Queries.GetSpecies;
public class GetSpeciesQueryHandler : IRequestHandler<GetSpeciesQuery, GetSpeciesResult>
{
    private readonly IBaseRepository<Domain.Entities.Species> _speciesRepository;
    private readonly IBaseRepository<Domain.Entities.Breed> _breedRepository;

    public GetSpeciesQueryHandler
    (
        IBaseRepository<Domain.Entities.Species> speciesRepository,
        IBaseRepository<Domain.Entities.Breed> breedRepository
    )
    {
        _speciesRepository = speciesRepository;
        _breedRepository = breedRepository;
    }

    public async Task<GetSpeciesResult> Handle(GetSpeciesQuery request, CancellationToken cancellationToken)
    {
        GetSpeciesResult result = new GetSpeciesResult();
        var species = _speciesRepository.StartQuery();

        foreach (var s in species)
        {
            var breeds = await _breedRepository.StartQuery()
                .Include(x => x.Species)
                .Where(x => x.Species == s)
                .ToListAsync(cancellationToken);

            result.Species.Add(new Common.Models.Species
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

        return result;
    }
}
