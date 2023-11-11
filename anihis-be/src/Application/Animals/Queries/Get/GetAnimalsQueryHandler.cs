using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Animals.Queries.Get;
public class GetAnimalsQueryHandler : IRequestHandler<GetAnimalsQuery, List<GetAnimalsResult>>
{
    private readonly IBaseRepository<Animal> _animalRepository;

    public GetAnimalsQueryHandler
    (
        IBaseRepository<Animal> animalRepository
    )
    {
        _animalRepository = animalRepository;
    }

    public async Task<List<GetAnimalsResult>> Handle(GetAnimalsQuery request, CancellationToken cancellationToken)
    {
        var animals = _animalRepository.StartQuery()
           .Include(x => x.Owner)
           .Include(x => x.Breed)
           .Include(x => x.Species);
           //.ToListAsync(cancellationToken);

        return animals.Select(animal => new GetAnimalsResult
        {
            AnimalUid = animal.Uid,
            BirthDateTime = animal.BirthDateTime,
            Breed = new Common.Models.Breed { Name = animal.Breed.Name },
            Gender = animal.Gender,
            LastModifiedDateTimeUtc = animal.LastModifiedDateTimeUtc,
            Name = animal.Name,
            Owner = new Common.Models.Owner { Uid = animal.Owner.Uid },
            PassportNumber = animal.PassportNumber,
            PersonalNumber = animal.PersonalNumber,
            Species = new Common.Models.Species { Name = animal.Species.Name },
            Warning = animal.Warning
        }).ToList();
    }
}
