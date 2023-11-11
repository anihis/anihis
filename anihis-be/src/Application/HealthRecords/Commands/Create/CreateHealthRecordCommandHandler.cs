using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.HealthRecords.Commands.Create;
public class CreateHealthRecordCommandHandler : IRequestHandler<CreateHealthRecordCommand>
{
    private readonly ICoreDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<HealthRecord> _healthRecordRepository;
    private readonly IBaseRepository<Animal> _animalRepository;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;
    private readonly IBaseRepository<User> _userRepository;

    public CreateHealthRecordCommandHandler
    (
        ICoreDbContext context,
        ICurrentUserService currentUserService,
        IBaseRepository<HealthRecord> healthRecordRepository,
        IBaseRepository<Animal> animalRepository,
        IBaseRepository<Veterinarian> veterinarianRepository,
        IBaseRepository<User> userRepository
    )
    {
        _context = context;
        _currentUserService = currentUserService;
        _healthRecordRepository = healthRecordRepository;
        _animalRepository = animalRepository;
        _veterinarianRepository = veterinarianRepository;
        _userRepository = userRepository;
    }

    public async Task Handle(CreateHealthRecordCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByUidOrThrowAsync(_currentUserService.UserUid, cancellationToken);
        var animal = await _animalRepository.GetByUidOrThrowAsync(request.AnimalUid, cancellationToken);
        //var veterinarian = await _veterinarianRepository.GetByUidOrThrowAsync(request.VeterinarianUid, cancellationToken);
        //var veterinarian = await _veterinarianRepository.GetByUidOrThrowAsync(_currentUserService.UserId, cancellationToken);

        _healthRecordRepository.Insert(new HealthRecord
        {
            Uid = Guid.NewGuid().ToString(),
            Animal = animal,
            Report = request.Report,
            Veterinarian = new Veterinarian
            {
                Uid = user.Uid
            }
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
