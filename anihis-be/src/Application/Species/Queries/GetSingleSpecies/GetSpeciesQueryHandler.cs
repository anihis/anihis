using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Application.Species.Queries.GetSingleSpecies;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Species.Queries.GetSingleSpecies;
public class GetSpeciesQueryHandler : IRequestHandler<GetSpeciesQuery, GetSingleSpeciesResult>
{
    private readonly IBaseRepository<Domain.Entities.Species> _speciesRepository;
    private readonly IBaseRepository<Breed> _breedRepository;

    public GetSpeciesQueryHandler
    (
        IBaseRepository<Domain.Entities.Species> speciesRepository,
        IBaseRepository<Breed> breedRepository
    )
    {
        _speciesRepository = speciesRepository;
        _breedRepository = breedRepository;
    }

    public async Task<GetSingleSpeciesResult> Handle(GetSpeciesQuery request, CancellationToken cancellationToken)
    {
        var species = await _speciesRepository.GetByUidOrThrowAsync(request.SpeciesUid, cancellationToken);

        if (species is null)
        {
            throw new NotFoundException();
        }

        var breeds = await _breedRepository.StartQuery()
            .Include(x => x.Species)
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
