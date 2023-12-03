namespace anihis.Domain.Entities;
public class HealthRecord : BaseEntity
{
    public Animal Animal { get; set; }
    public Veterinarian Veterinarian { get; set; }
    //public DateTime? Control { get; set; }
    //public string? Temperature { get; set; }
    //public string? Weight { get; set; }
    //public string? Anamnesis { get; set; }
    //public string? ClinicalExamination { get; set; }
    //public string? Recommendation { get; set; }
    public string? Report { get; set; }
    public DateTime? LastModifiedDateTimeUtc { get; set; }
}
