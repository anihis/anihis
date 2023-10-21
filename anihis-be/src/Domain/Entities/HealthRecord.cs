namespace anihis.Domain.Entities;
public class HealthRecord : BaseEntity
{
    public Animal Animal { get; set; }
    public Veterinarian Veterinarian { get; set; }
    public string? Report { get; set; }
}
