namespace anihis.Domain.Entities;
public class HealthRecordDiagnosis : BaseEntity
{
    public HealthRecord HealthRecord { get; set; }
    public Diagnosis Diagnosis { get; set; }
    public string? DiagnosisNote { get; set; }
}
