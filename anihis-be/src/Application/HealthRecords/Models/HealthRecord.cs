using anihis.Application.Common.Models;

namespace anihis.Application.HealthRecords.Models;
public class HealthRecord
{
    public string HealthRecordUid { get; set; }
    public Animal Animal { get; set; }
    public Owner Owner { get; set; }
}
