namespace anihis.Domain.Entities;
public class HealthRecordPrescription : BaseEntity
{
    public HealthRecord HealthRecord { get; set; }
    public Prescription Prescription { get; set; }
    public string? PrescriptionNote { get; set; }
    public string? PrescriptionQuantity { get; set; }
    public string? PrescriptionPrice { get; set; }
    public string? PrescriptionVAT { get; set; }
    public string? PrescriptionTotal { get; set; }
}
