using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Animals.Commands.Update;
public class UpdateAnimalCommandHandler : IRequestHandler<UpdateAnimalCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Animal> _animalRepository;
    private readonly IBaseRepository<Owner> _ownerRepository;
    private readonly IBaseRepository<Breed> _breedRepository;
    private readonly IValidator<UpdateAnimalCommand> _validator;

    public UpdateAnimalCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Animal> animalRepository,
        IBaseRepository<Owner> ownerRepository,
        IBaseRepository<Breed> breedRepository,
        IValidator<UpdateAnimalCommand> validator
    )
    {
        _context = context;
        _animalRepository = animalRepository;
        _ownerRepository = ownerRepository;
        _breedRepository = breedRepository;
        _validator = validator;
    }

    public async Task Handle(UpdateAnimalCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var owner = await _ownerRepository.GetByUidOrThrowAsync(request.OwnerUid, cancellationToken);

        await _animalRepository.ThrowIfConflict(x =>
            x.Name.ToLower() == request.Name.ToLower() && x.Owner == owner ||
            x.PersonalNumber == request.PersonalNumber ||
            x.PassportNumber == request.PassportNumber,
            cancellationToken);

        var animal = await _animalRepository.StartQuery()
            .Include(x => x.Owner)
            .Include(x => x.Breed)
            .Where(x => x.Uid == request.AnimalUid)
            .SingleOrDefaultAsync(cancellationToken);

        if (animal is null)
        {
            throw new NotFoundException();
        }

        var breed = await _breedRepository.GetByUidOrThrowAsync(request.BreedUid, cancellationToken);

        animal.BirthDateTime = request.BirthDateTime;
        animal.Breed = breed == null ? animal.Breed : breed;
        animal.Color = request.Color;
        animal.Gender = request.Gender;
        animal.Identification = request.Identification;
        animal.LastModifiedDateTimeUtc = DateTime.UtcNow;
        animal.MarkingDateTimeUtc = request.MarkingDateTimeUtc;
        animal.Name = string.IsNullOrEmpty(request.Name) ? animal.Name : request.Name;
        animal.Owner = owner == null ? animal.Owner : owner;
        animal.PassportNumber = request.PassportNumber;
        animal.Pedigree = request.Pedigree;
        animal.PersonalNumber = request.PersonalNumber;
        animal.Sterilized = request.Sterilized;
        animal.SterilizedDateTimeUtc = request.SterilizedDateTimeUtc;
        animal.VIIssuesAPassport = request.VIIssuesAPassport;
        animal.Warning = request.Warning;
        _animalRepository.Update(animal);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
