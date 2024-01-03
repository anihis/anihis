namespace anihis.Domain.Entities;
public class Service : BaseEntity
{
    public VeterinaryClinic VeterinaryClinic { get; set; }
    public string Name { get; set; }
    public int Code { get; set; } // Sifra u kasu
}
