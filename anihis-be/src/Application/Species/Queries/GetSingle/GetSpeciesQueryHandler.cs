using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using MediatR;

namespace anihis.Application.Species.Queries.GetSingle;
public class GetSpeciesQueryHandler : IRequestHandler<GetSpeciesQuery, GetSpeciesResult>
{
    private readonly IBaseRepository<Domain.Entities.Species> _speciesRepository;

    public GetSpeciesQueryHandler
    (
        IBaseRepository<Domain.Entities.Species> speciesRepository
    )
    {
        _speciesRepository = speciesRepository;
    }

    public async Task<GetSpeciesResult> Handle(GetSpeciesQuery request, CancellationToken cancellationToken)
    {
        var species = await _speciesRepository.GetByUidOrThrowAsync(request.SpeciesUid, cancellationToken);

        if (species is null)
        {
            throw new NotFoundException();
        }

        return new GetSpeciesResult
        {
            SpeciesUid = species.Uid,
            Name = species.Name
        };
    }
}
