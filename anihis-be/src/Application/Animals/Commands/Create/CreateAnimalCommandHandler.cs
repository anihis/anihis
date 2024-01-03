using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;

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

        await _animalRepository.ThrowIfConflict(x =>
            x.Name.ToLower() == request.Name.ToLower() && x.Owner == owner ||
            x.PersonalNumber == request.PersonalNumber ||
            x.PassportNumber == request.PassportNumber,
            cancellationToken);

        var breed = await _breedRepository.GetByUidOrThrowAsync(request.BreedUid, cancellationToken);

        _animalRepository.Insert(new Animal
        {
            Uid = Guid.NewGuid().ToString(),
            BirthDateTime = request.BirthDateTime,
            Breed = breed,
            Color = request.Color,
            Gender = request.Gender,
            Identification = request.Identification,
            MarkingDateTimeUtc = request.MarkingDateTimeUtc,
            Name = request.Name,
            Owner = owner,
            PassportNumber = request.PassportNumber,
            Pedigree = request.Pedigree,
            PersonalNumber = request.PersonalNumber,
            Sterilized = request.Sterilized,
            SterilizedDateTimeUtc = request.SterilizedDateTimeUtc,
            VIIssuesAPassport = request.VIIssuesAPassport,
            Warning = request.Warning,
            LastModifiedDateTimeUtc = DateTime.UtcNow
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
