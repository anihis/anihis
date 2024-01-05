using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.HealthRecords.Commands.UpdateService;
public class UpdateServiceCommandHandler : IRequestHandler<UpdateServiceCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Service> _serviceRepository;
    private readonly IValidator<UpdateServiceCommand> _validator;

    public UpdateServiceCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Service> serviceRepository,
        IValidator<UpdateServiceCommand> validator
    )
    {
        _context = context;
        _serviceRepository = serviceRepository;
        _validator = validator;
    }

    public async Task Handle(UpdateServiceCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var service = await _serviceRepository.StartQuery()
            .Include(x => x.VeterinaryClinic)
            .Where(x => x.Uid == request.ServiceUid)
            .SingleOrDefaultAsync(cancellationToken);

        if (service is null)
        {
            throw new NotFoundException();
        }

        await _serviceRepository.ThrowIfConflict(x =>
            x.Name.ToLower() == request.Name.ToLower() && x.VeterinaryClinic == service.VeterinaryClinic,
            cancellationToken);

        service.Name = request.Name;
        _serviceRepository.Update(service);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
