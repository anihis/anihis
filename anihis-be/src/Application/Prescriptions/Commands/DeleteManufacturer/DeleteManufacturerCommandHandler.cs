using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.Prescriptions.Commands.DeleteManufacturer;
public class DeleteManufacturerCommandHandler : IRequestHandler<DeleteManufacturerCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Manufacturer> _manufacturerRepository;

    public DeleteManufacturerCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Manufacturer> manufacturerRepository
    )
    {
        _context = context;
        _manufacturerRepository = manufacturerRepository;
    }

    public async Task Handle(DeleteManufacturerCommand request, CancellationToken cancellationToken)
    {
        var manufacturer = await _manufacturerRepository.GetByUidOrThrowAsync(request.ManufacturerUid, cancellationToken);

        _manufacturerRepository.Delete(manufacturer);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
