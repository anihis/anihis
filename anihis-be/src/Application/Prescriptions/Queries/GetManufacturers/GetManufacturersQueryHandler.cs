using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.Prescriptions.Queries.GetManufacturers;
public class GetManufacturersQueryHandler : IRequestHandler<GetManufacturersQuery, GetManufacturersResult>
{
    private readonly IBaseRepository<Manufacturer> _manufacturerRepository;

    public GetManufacturersQueryHandler
    (
        IBaseRepository<Manufacturer> manufacturerRepository
    )
    {
        _manufacturerRepository = manufacturerRepository;
    }

    public async Task<GetManufacturersResult> Handle(GetManufacturersQuery request, CancellationToken cancellationToken)
    {
        var manufacturers = _manufacturerRepository.StartQuery();

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
