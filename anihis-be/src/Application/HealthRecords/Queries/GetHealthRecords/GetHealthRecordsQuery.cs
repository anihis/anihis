using MediatR;

namespace anihis.Application.HealthRecords.Queries.GetHealthRecords;
public class GetHealthRecordsQuery : IRequest<GetHealthRecordsResult>
{
    public string AnimalUid { get; set; }
}
