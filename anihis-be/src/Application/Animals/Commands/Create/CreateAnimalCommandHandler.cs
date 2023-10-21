using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.Animals.Commands.Create;
public class CreateAnimalCommandHandler : IRequestHandler<CreateAnimalCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Animal> _animalRepository;
    private readonly IBaseRepository<Owner> _ownerRepository;
    private readonly IBaseRepository<Breed> _breedRepository;
    private readonly IBaseRepository<Species> _speciesRepository;

    public CreateAnimalCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Animal> animalRepository,
        IBaseRepository<Owner> ownerRepository,
        IBaseRepository<Breed> breedRepository,
        IBaseRepository<Species> speciesRepository
    )
    {
        _context = context;
        _animalRepository = animalRepository;
        _ownerRepository = ownerRepository;
        _breedRepository = breedRepository;
        _speciesRepository = speciesRepository;
    }

    public async Task Handle(CreateAnimalCommand request, CancellationToken cancellationToken)
    {
        var owner = await _ownerRepository.GetByUidOrThrowAsync(request.OwnerUid, cancellationToken);
        var breed = await _breedRepository.GetByUidOrThrowAsync(request.BreedUid, cancellationToken);
        var species = await _speciesRepository.GetByUidOrThrowAsync(request.SpeciesUid, cancellationToken);

        _animalRepository.Insert(new Animal
        {
            Uid = Guid.NewGuid().ToString(),
            BirthDateTime = request.BirthDateTime,
            Breed = breed,
            Gender = request.Gender,
            Name = request.Name,
            Owner = owner,
            PassportNumber = request.PassportNumber,
            PersonalNumber = request.PersonalNumber,
            Species = species,
            Warning = request.Warning
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
