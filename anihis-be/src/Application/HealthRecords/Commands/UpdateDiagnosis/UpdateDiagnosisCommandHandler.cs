using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.HealthRecords.Commands.UpdateDiagnosis;
public class UpdateDiagnosisCommandHandler : IRequestHandler<UpdateDiagnosisCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Diagnosis> _diagnosisRepository;
    private readonly IValidator<UpdateDiagnosisCommand> _validator;

    public UpdateDiagnosisCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Diagnosis> diagnosisRepository,
        IValidator<UpdateDiagnosisCommand> validator
    )
    {
        _context = context;
        _diagnosisRepository = diagnosisRepository;
        _validator = validator;
    }

    public async Task Handle(UpdateDiagnosisCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var diagnosis = await _diagnosisRepository.StartQuery()
            .Include(x => x.VeterinaryClinic)
            .Where(x => x.Uid == request.DiagnosisUid)
            .SingleOrDefaultAsync(cancellationToken);

        if (diagnosis is null)
        {
            throw new NotFoundException();
        }

        await _diagnosisRepository.ThrowIfConflict(x =>
            x.Name.ToLower() == request.Name.ToLower() && x.VeterinaryClinic == diagnosis.VeterinaryClinic,
            cancellationToken);

        diagnosis.Name = request.Name;
        _diagnosisRepository.Update(diagnosis);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
