namespace anihis.Domain.Entities;
public class Veterinarian : User
{
    public string LicenceNumber { get; set; }
    public VeterinaryClinic VeterinaryClinic { get; set; }
}
