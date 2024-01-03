namespace anihis.Application.Prescriptions.Models;
public class Prescription
{
    public string Name { get; set; }
    public string? AlternateName { get; set; }
    public int Code { get; set; }
    public string PrescriptionType { get; set; }
    public string? JM { get; set; }
    public string MainPrice { get; set; }
    public string? SecondPrice { get; set; }
    public string ManufacturerName { get; set; }
}
