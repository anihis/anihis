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
        var animal = await _animalRepository.StartQuery()
            .Include(x => x.Owner)
            .Include(x => x.Breed)
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
            Breed = animal.Breed?.Name,
            Color = animal.Color,
            Gender = animal.Gender,
            Identification = animal.Identification,
            LastModifiedDateTimeUtc = animal.LastModifiedDateTimeUtc,
            MarkingDateTimeUtc = animal.MarkingDateTimeUtc,
            Name = animal.Name,
            Owner = new Common.Models.Owner { Uid = animal.Owner.Uid },
            Pedigree = animal.Pedigree,
            PassportNumber = animal.PassportNumber,
            PersonalNumber = animal.PersonalNumber,
            Sterilized = animal.Sterilized,
            SterilizedDateTimeUtc = animal.SterilizedDateTimeUtc,
            Species = animal.Breed?.Species.Name,
            VIIssuesAPassport = animal.VIIssuesAPassport,
            Warning = animal.Warning
        };
    }
}
