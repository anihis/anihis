using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.VeterinaryClinics.Queries.Get;
public class GetVeterinaryClinicsQueryHandler : IRequestHandler<GetVeterinaryClinicsQuery, List<GetVeterinaryClinicsResult>>
{
    private readonly IBaseRepository<VeterinaryClinic> _veterinaryClinicRepository;

    public GetVeterinaryClinicsQueryHandler
    (
        IBaseRepository<VeterinaryClinic> veterinaryClinicRepository
    )
    {
        _veterinaryClinicRepository = veterinaryClinicRepository;
    }

    public async Task<List<GetVeterinaryClinicsResult>> Handle(GetVeterinaryClinicsQuery request, CancellationToken cancellationToken)
    {
        var veterinaryClinics = _veterinaryClinicRepository.StartQuery();

        return veterinaryClinics.Select(s => new GetVeterinaryClinicsResult
        {
            Uid = s.Uid,
            Name = s.Name
        }).ToList();
    }
}
