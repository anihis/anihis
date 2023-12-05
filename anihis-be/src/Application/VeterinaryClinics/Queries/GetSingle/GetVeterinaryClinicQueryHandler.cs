using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.VeterinaryClinics.Queries.GetSingle;
public class GetVeterinaryClinicQueryHandler : IRequestHandler<GetVeterinaryClinicQuery, GetVeterinaryClinicResult>
{
    private readonly IBaseRepository<VeterinaryClinic> _veterinaryClinicRepository;

    public GetVeterinaryClinicQueryHandler
    (
        IBaseRepository<VeterinaryClinic> veterinaryClinicRepository
    )
    {
        _veterinaryClinicRepository = veterinaryClinicRepository;
    }

    public async Task<GetVeterinaryClinicResult> Handle(GetVeterinaryClinicQuery request, CancellationToken cancellationToken)
    {
        var veterinaryClinic = await _veterinaryClinicRepository.GetByUidOrThrowAsync(request.VeterinaryClinicUid, cancellationToken);

        return new GetVeterinaryClinicResult
        {
            Uid = veterinaryClinic.Uid,
            Name = veterinaryClinic.Name
        };
    }
}
