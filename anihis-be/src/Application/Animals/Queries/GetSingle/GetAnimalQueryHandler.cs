using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Animals.Queries.GetSingle;
public class GetAnimalQueryHandler : IRequestHandler<GetAnimalQuery, GetAnimalResult>
{
    private readonly IBaseRepository<Animal> _animalRepository;

    public GetAnimalQueryHandler
    (
        IBaseRepository<Animal> animalRepository
    )
    {
        _animalRepository = animalRepository;
    }

    public async Task<GetAnimalResult> Handle(GetAnimalQuery request, CancellationToken cancellationToken)
    {
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

        return new GetAnimalResult
        {
            AnimalUid = animal.Uid,
            BirthDateTime = animal.BirthDateTime,
            Breed = new Common.Models.Breed { Name = animal.Breed?.Name },
            Gender = animal.Gender,
            LastModifiedDateTimeUtc = animal.LastModifiedDateTimeUtc,
            Name = animal.Name,
            Owner = new Common.Models.Owner { Uid = animal.Owner.Uid },
            PassportNumber = animal.PassportNumber,
            PersonalNumber = animal.PersonalNumber,
            Species = new Common.Models.Species { Name = animal.Species.Name },
            Warning = animal.Warning
        };
    }
}
