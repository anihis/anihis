using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.HealthRecords.Commands.DeleteDiagnosis;
public class DeleteDiagnosisCommandHandler : IRequestHandler<DeleteDiagnosisCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Diagnosis> _diagnosisRepository;

    public DeleteDiagnosisCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Diagnosis> diagnosisRepository
    )
    {
        _context = context;
        _diagnosisRepository = diagnosisRepository;
    }

    public async Task Handle(DeleteDiagnosisCommand request, CancellationToken cancellationToken)
    {
        var diagnosis = await _diagnosisRepository.GetByUidOrThrowAsync(request.DiagnosisUid, cancellationToken);
        _diagnosisRepository.Delete(diagnosis);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
