using anihis.Application.Common.Interfaces;
using anihis.Application.Veterinarians.Commands.Create;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Animals.Commands.Create;
public class CreateAnimalCommandHandler : IRequestHandler<CreateAnimalCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Animal> _animalRepository;
    private readonly IBaseRepository<Owner> _ownerRepository;
    private readonly IBaseRepository<Breed> _breedRepository;
    private readonly IValidator<CreateAnimalCommand> _validator;

    public CreateAnimalCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Animal> animalRepository,
        IBaseRepository<Owner> ownerRepository,
        IBaseRepository<Breed> breedRepository,
        IValidator<CreateAnimalCommand> validator
    )
    {
        _context = context;
        _animalRepository = animalRepository;
        _ownerRepository = ownerRepository;
        _breedRepository = breedRepository;
        _validator = validator;
    }

    public async Task Handle(CreateAnimalCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var owner = await _ownerRepository.GetByUidOrThrowAsync(request.OwnerUid, cancellationToken);
        var breed = await _breedRepository.StartQuery()
            .Include(x => x.Species)
            .Where(x => x.Uid == request.BreedUid)
            .SingleOrDefaultAsync(cancellationToken);

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
            Species = breed.Species,
            Warning = request.Warning,
            LastModifiedDateTimeUtc = DateTime.UtcNow
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
