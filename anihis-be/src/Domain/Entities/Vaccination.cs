namespace anihis.Domain.Entities;
public class Vaccination : BaseEntity
{
    public Veterinarian Veterinarian { get; set; }
    public Animal Animal { get; set; }
    public string VaccineName { get; set; }
    public string VaccineSerialNumber { get; set; }
    public DateTime VaccinationDateTimeUtc { get; set; }
    public string Price { get; set; }
}
