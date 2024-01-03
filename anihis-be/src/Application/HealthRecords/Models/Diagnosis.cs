using anihis.Domain.Enums;

namespace anihis.Application.HealthRecords.Models;
public class Diagnosis
{
    public string DiagnosisUid { get; set; }
    public DiagnosisType DiagnosisType { get; set; }
    public string Name { get; set; }
    public int Code { get; set; }
}
