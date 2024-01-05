using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Prescriptions.Queries.GetManufacturers;
public class GetManufacturersQueryHandler : IRequestHandler<GetManufacturersQuery, GetManufacturersResult>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<Manufacturer> _manufacturerRepository;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;

    public GetManufacturersQueryHandler
    (
        ICurrentUserService currentUserService,
        IBaseRepository<Manufacturer> manufacturerRepository,
        IBaseRepository<Veterinarian> veterinarianRepository
    )
    {
        _currentUserService = currentUserService;
        _manufacturerRepository = manufacturerRepository;
        _veterinarianRepository = veterinarianRepository;
    }

    public async Task<GetManufacturersResult> Handle(GetManufacturersQuery request, CancellationToken cancellationToken)
    {
        var veterinarian = await _veterinarianRepository.StartQuery()
            .Include(x => x.VeterinaryClinic)
            .Where(x => x.Uid == _currentUserService.UserUid)
            .SingleOrDefaultAsync(cancellationToken);

        var manufacturers = _manufacturerRepository.StartQuery()
            .Where(x => x.VeterinaryClinic == veterinarian.VeterinaryClinic);

        return new GetManufacturersResult
        {
            Manufacturers = manufacturers.Select(manufacturer => new Models.Manufacturer
            {
                Address = manufacturer.Address,
                BankAccount = manufacturer.BankAccount,
                City = manufacturer.City,
                ContactPerson = manufacturer.ContactPerson,
                MobileNumber = manufacturer.MobileNumber,
                Name = manufacturer.Name,
                PhoneNumber = manufacturer.PhoneNumber,
                Uid = manufacturer.Uid
            }).ToList()
        };
    }
}
