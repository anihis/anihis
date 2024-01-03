using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.Prescriptions.Commands.Delete;
public class DeletePrescriptionCommandHandler : IRequestHandler<DeletePrescriptionCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Prescription> _prescriptionRepository;

    public DeletePrescriptionCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Prescription> prescriptionRepository
    )
    {
        _context = context;
        _prescriptionRepository = prescriptionRepository;
    }

    public async Task Handle(DeletePrescriptionCommand request, CancellationToken cancellationToken)
    {
        var prescription = await _prescriptionRepository.GetByUidOrThrowAsync(request.PrescriptionUid, cancellationToken);

        _prescriptionRepository.Delete(prescription);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
