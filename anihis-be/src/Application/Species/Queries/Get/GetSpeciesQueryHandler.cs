using anihis.Application.Common.Interfaces;
using MediatR;

namespace anihis.Application.Species.Queries.Get;
public class GetSpeciesQueryHandler : IRequestHandler<GetSpeciesQuery, List<GetSpeciesResult>>
{
    private readonly IBaseRepository<Domain.Entities.Species> _speciesRepository;

    public GetSpeciesQueryHandler
    (
        IBaseRepository<Domain.Entities.Species> speciesRepository
    )
    {
        _speciesRepository = speciesRepository;
    }

    public async Task<List<GetSpeciesResult>> Handle(GetSpeciesQuery request, CancellationToken cancellationToken)
    {
        var species = _speciesRepository.StartQuery();

        return species.Select(s => new GetSpeciesResult
        {
            SpeciesUid = s.Uid,
            Name = s.Name
        }).ToList();
    }
}
