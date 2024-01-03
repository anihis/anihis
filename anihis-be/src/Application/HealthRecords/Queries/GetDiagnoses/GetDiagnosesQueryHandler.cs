using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.HealthRecords.Queries.GetDiagnoses;
public class GetDiagnosesQueryHandler : IRequestHandler<GetDiagnosesQuery, GetDiagnosesResult>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;
    private readonly IBaseRepository<Diagnosis> _diagnosisRepository;

    public GetDiagnosesQueryHandler
    (
        ICurrentUserService currentUserService,
        IBaseRepository<Veterinarian> veterinarianRepository,
        IBaseRepository<Diagnosis> diagnosisRepository
    )
    {
        _currentUserService = currentUserService;
        _veterinarianRepository = veterinarianRepository;
        _diagnosisRepository = diagnosisRepository;
    }

    public async Task<GetDiagnosesResult> Handle(GetDiagnosesQuery request, CancellationToken cancellationToken)
    {
        var veterinarian = await _veterinarianRepository.StartQuery()
           .Include(x => x.VeterinaryClinic)
           .Where(x => x.Uid == _currentUserService.UserUid)
           .SingleOrDefaultAsync(cancellationToken);

        var diagnoses = await _diagnosisRepository.StartQuery()
            .Where(x => x.VeterinaryClinic == veterinarian.VeterinaryClinic).ToListAsync(cancellationToken);

        return new GetDiagnosesResult
        {
            Diagnoses = diagnoses.Select(diagnosis => new Models.Diagnosis
            {
                Code = diagnosis.Code,
                DiagnosisType = diagnosis.DiagnosisType,
                DiagnosisUid = diagnosis.Uid,
                Name = diagnosis.Name
            }).ToList()
        };
    }
}
