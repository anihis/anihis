namespace anihis.Domain.Entities;
public class Payment : BaseEntity
{
    public Owner Owner { get; set; }
    public Veterinarian Veterinarian { get; set; }
    public VeterinaryClinic VeterinaryClinic { get; set; }
    public DateTime PaymentDateTimeUtc { get; set; }
    public string Value { get; set; }
}
