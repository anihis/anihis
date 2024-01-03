using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.HealthRecords.Queries.GetHealthRecords;
public class GetHealthRecordsQueryHandler : IRequestHandler<GetHealthRecordsQuery, GetHealthRecordsResult>
{
    private readonly IBaseRepository<HealthRecord> _healthRecordRepository;

    public GetHealthRecordsQueryHandler
    (
        IBaseRepository<HealthRecord> healthRecordRepository
    )
    {
        _healthRecordRepository = healthRecordRepository;
    }

    public async Task<GetHealthRecordsResult> Handle(GetHealthRecordsQuery request, CancellationToken cancellationToken)
    {
        var healthRecords = await _healthRecordRepository.StartQuery()
            .Include(x => x.Animal)
            .Include(x => x.Animal.Breed)
            .Include(x => x.Animal.Owner)
            .Select(x => new Models.HealthRecord
            {
                HealthRecordUid = x.Uid,
                Animal = new Common.Models.Animal
                {
                    AnimalUid = x.Animal.Uid,
                    BirthDateTime = x.Animal.BirthDateTime,
                    BreedName = x.Animal.Breed.Name,
                    Name = x.Animal.Name
                },
                Owner = new Common.Models.Owner
                {
                    Address = x.Animal.Owner.Address,
                    City = x.Animal.Owner.City,
                    FirstName = x.Animal.Owner.FirstName,
                    LastName = x.Animal.Owner.LastName,
                    Uid = x.Animal.Owner.Uid
                }
            })
            .ToListAsync(cancellationToken);

        return new GetHealthRecordsResult
        {
            HealthRecords = healthRecords
        };
    }
}
