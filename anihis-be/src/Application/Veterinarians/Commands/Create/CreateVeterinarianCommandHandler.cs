using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.Veterinarians.Commands.Create;
public class CreateVeterinarianCommandHandler : IRequestHandler<CreateVeterinarianCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;
    private readonly IBaseRepository<VeterinaryClinic> _veterinaryClinicRepository;
    private readonly IBaseRepository<User> _userRepository;

    public CreateVeterinarianCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Veterinarian> veterinarianRepository,
        IBaseRepository<VeterinaryClinic> veterinaryClinicRepository,
        IBaseRepository<User> userRepository
    )
    {
        _context = context;
        _veterinarianRepository = veterinarianRepository;
        _veterinaryClinicRepository = veterinaryClinicRepository;
        _userRepository = userRepository;
    }

    public async Task Handle(CreateVeterinarianCommand request, CancellationToken cancellationToken)
    {
        var veterinaryClinic = await _veterinaryClinicRepository.GetByUidOrThrowAsync(request.VeterinaryClinicUid, cancellationToken);
        var user = await _userRepository.GetByUidOrThrowAsync(request.UserUid, cancellationToken);

        _veterinarianRepository.Insert(new Veterinarian
        {
            Uid = Guid.NewGuid().ToString(),
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            LicenceNumber = request.LicenceNumber,
            MobileNumber = request.MobileNumber,
            PhoneNumber = request.PhoneNumber,
            VeterinaryClinic = veterinaryClinic,
            User = user
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
