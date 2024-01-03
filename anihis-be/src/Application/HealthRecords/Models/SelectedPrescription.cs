namespace anihis.Application.HealthRecords.Models;
public class SelectedPrescription
{
    public string PrescriptionUid { get; set; }
    public string? PrescriptionNote { get; set; }
    public string? PrescriptionQuantity { get; set; }
    public string? PrescriptionPrice { get; set; }
    public string? PrescriptionVAT { get; set; }
    public string? PrescriptionTotal { get; set; }
}
