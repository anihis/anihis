namespace anihis.Domain.Entities;
public class Diagnosis : BaseEntity
{
    public VeterinaryClinic VeterinaryClinic { get; set; }
    public DiagnosisType DiagnosisType { get; set; }
    public string Name { get; set; }
    public int Code { get; set; } // Sifra u kasu
}
