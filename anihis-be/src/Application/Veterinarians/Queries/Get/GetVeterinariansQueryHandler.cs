using anihis.Application.Common.Interfaces;
using MediatR;

namespace anihis.Application.Veterinarians.Queries.Get;
public class GetVeterinariansQueryHandler : IRequestHandler<GetVeterinariansQuery, GetVeterinariansResult>
{
    private readonly IBaseRepository<Domain.Entities.Veterinarian> _veterinarianRepository;

    public GetVeterinariansQueryHandler(IBaseRepository<Domain.Entities.Veterinarian> veterinarianRepository)
    {
        _veterinarianRepository = veterinarianRepository;
    }

    public async Task<GetVeterinariansResult> Handle(GetVeterinariansQuery request, CancellationToken cancellationToken)
    {
        var veterinarians = _veterinarianRepository.StartQuery();

        return new GetVeterinariansResult
        {
            Veterinarians = veterinarians.Select(veterinarian => new Common.Models.Veterinarian
            {
                Uid = veterinarian.Uid,
                Email = veterinarian.Email,
                FirstName = veterinarian.FirstName,
                LastName = veterinarian.LastName,
                LicenceNumber = veterinarian.LicenceNumber,
                MobileNumber = veterinarian.MobileNumber,
                PhoneNumber = veterinarian.PhoneNumber,
                Username = veterinarian.Username
            }).ToList()
        };
    }
}
