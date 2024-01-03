using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.HealthRecords.Queries.GetServices;
public class GetServicesQueryHandler : IRequestHandler<GetServicesQuery, GetServicesResult>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;
    private readonly IBaseRepository<Service> _serviceRepository;

    public GetServicesQueryHandler
    (
        ICurrentUserService currentUserService,
        IBaseRepository<Veterinarian> veterinarianRepository,
        IBaseRepository<Service> serviceRepository
    )
    {
        _currentUserService = currentUserService;
        _veterinarianRepository = veterinarianRepository;
        _serviceRepository = serviceRepository;
    }

    public async Task<GetServicesResult> Handle(GetServicesQuery request, CancellationToken cancellationToken)
    {
        var veterinarian = await _veterinarianRepository.StartQuery()
            .Include(x => x.VeterinaryClinic)
            .Where(x => x.Uid == _currentUserService.UserUid)
            .SingleOrDefaultAsync(cancellationToken);

        var services = await _serviceRepository.StartQuery()
            .Where(x => x.VeterinaryClinic == veterinarian.VeterinaryClinic).ToListAsync(cancellationToken);

        return new GetServicesResult
        {
            Services = services.Select(service => new Models.Service
            {
                Code = service.Code,
                Name = service.Name,
                ServiceUid = service.Uid
            }).ToList()
        };
    }
}
