using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Veterinarians.Queries.GetSingle;
public class GetVeterinarianQueryHandler : IRequestHandler<GetVeterinarianQuery, GetVeterinarianResult>
{
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;

    public GetVeterinarianQueryHandler
    (
        IBaseRepository<Veterinarian> veterinarianRepository
    )
    {
        _veterinarianRepository = veterinarianRepository;
    }

    public async Task<GetVeterinarianResult> Handle(GetVeterinarianQuery request, CancellationToken cancellationToken)
    {
        var veterinarian = await _veterinarianRepository.StartQuery()
            .Include(x => x.VeterinaryClinic)
            .Where(x => x.Uid == request.Uid)
            .SingleOrDefaultAsync(cancellationToken);

        return new GetVeterinarianResult
        {
            Email = veterinarian.Email,
            FirstName = veterinarian.FirstName,
            LastName = veterinarian.LastName,
            LicenceNumber = veterinarian.LicenceNumber,
            MobileNumber = veterinarian.MobileNumber,
            PhoneNumber = veterinarian.PhoneNumber,
            Username = veterinarian.Username,
            VeterinaryClinic = new Common.Models.VeterinaryClinic
            {
                Name = veterinarian.VeterinaryClinic.Name
            }
        };
    }
}
