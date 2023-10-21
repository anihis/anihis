using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.Veterinarians.Commands.Create;
public class CreateVeterinarianCommandHandler : IRequestHandler<CreateVeterinarianCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;
    private readonly IBaseRepository<VeterinaryClinic> _veterinaryClinicRepository;

    public CreateVeterinarianCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Veterinarian> veterinarianRepository,
        IBaseRepository<VeterinaryClinic> veterinaryClinicRepository
    )
    {
        _context = context;
        _veterinarianRepository = veterinarianRepository;
        _veterinaryClinicRepository = veterinaryClinicRepository;
    }

    public async Task Handle(CreateVeterinarianCommand request, CancellationToken cancellationToken)
    {
        var veterinaryClinic = await _veterinaryClinicRepository.GetByUidOrThrowAsync(request.VeterinaryClinicUid, cancellationToken);

        _veterinarianRepository.Insert(new Veterinarian
        {
            Uid = Guid.NewGuid().ToString(),
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            LicenceNumber = request.LicenceNumber,
            MobileNumber = request.MobileNumber,
            PhoneNumber = request.PhoneNumber,
            VeterinaryClinic = veterinaryClinic
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
