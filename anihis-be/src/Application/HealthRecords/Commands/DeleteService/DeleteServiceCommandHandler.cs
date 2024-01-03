using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.HealthRecords.Commands.DeleteService;
public class DeleteServiceCommandHandler : IRequestHandler<DeleteServiceCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Service> _serviceRepository;

    public DeleteServiceCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Service> serviceRepository
    )
    {
        _context = context;
        _serviceRepository = serviceRepository;
    }

    public async Task Handle(DeleteServiceCommand request, CancellationToken cancellationToken)
    {
        var diagnosis = await _serviceRepository.GetByUidOrThrowAsync(request.ServiceUid, cancellationToken);
        _serviceRepository.Delete(diagnosis);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
