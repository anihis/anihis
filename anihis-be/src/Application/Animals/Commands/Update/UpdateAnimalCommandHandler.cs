using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Animals.Commands.Update;
public class UpdateAnimalCommandHandler : IRequestHandler<UpdateAnimalCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Animal> _animalRepository;
    private readonly IBaseRepository<Owner> _ownerRepository;
    private readonly IBaseRepository<Breed> _breedRepository;
    //private readonly IBaseRepository<Domain.Entities.Species> _speciesRepository;

    public UpdateAnimalCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Animal> animalRepository,
        IBaseRepository<Owner> ownerRepository,
        IBaseRepository<Breed> breedRepository
        //IBaseRepository<Domain.Entities.Species> speciesRepository
    )
    {
        _context = context;
        _animalRepository = animalRepository;
        _ownerRepository = ownerRepository;
        _breedRepository = breedRepository;
        //_speciesRepository = speciesRepository;
    }

    public async Task Handle(UpdateAnimalCommand request, CancellationToken cancellationToken)
    {
        //Owner owner;

        var animal = await _animalRepository.GetQuery()
            .Include(x => x.Owner)
            .Include(x => x.Breed)
            .Include(x => x.Species)
            .Where(x => x.Uid == request.AnimalUid)
            .SingleOrDefaultAsync(cancellationToken);

        if (animal is null)
        {
            throw new NotFoundException();
        }

        //if (request.OwnerUid is not null)
        //    owner = await _ownerRepository.GetByUidOrThrowAsync(request.OwnerUid, cancellationToken);

        var breed = await _breedRepository.GetByUidOrThrowAsync(request.BreedUid, cancellationToken);
        var owner = await _ownerRepository.GetByUidOrThrowAsync(request.OwnerUid, cancellationToken);
        //var species = await _speciesRepository.GetByUidOrThrowAsync(request.SpeciesUid, cancellationToken);

        //animal.Name = (!string.IsNullOrEmpty(request.Name)) ? request.Name : animal.Name;
        //animal.PassportNumber = (!string.IsNullOrEmpty(request.PassportNumber)) ? request.PassportNumber : animal.PassportNumber;
        //animal.PersonalNumber = (!string.IsNullOrEmpty(request.PersonalNumber)) ? request.PersonalNumber : animal.PersonalNumber;
        //animal.Warning = (!string.IsNullOrEmpty(request.Warning)) ? request.Warning : animal.Warning;

        animal.BirthDateTime = request.BirthDateTime;
        animal.Breed = breed;
        animal.Gender = request.Gender;
        animal.LastModifiedDateTimeUtc = DateTime.UtcNow;
        animal.Name = request.Name;
        animal.Owner = owner;
        animal.PassportNumber = request.PassportNumber;
        animal.PersonalNumber = request.PersonalNumber;
        animal.Species = breed.Species;
        animal.Warning = request.Warning;

        _animalRepository.Update(animal);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
