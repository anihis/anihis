using MediatR;

namespace anihis.Application.HealthRecords.Queries.GetHealthRecord;
public class GetHealthRecordQuery : IRequest<GetHealthRecordResult>
{
    public string HealthRecordUid { get; set; }
}
