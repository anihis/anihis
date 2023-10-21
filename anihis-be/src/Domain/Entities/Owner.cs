namespace anihis.Domain.Entities;
public class Owner : BaseEntity
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string City { get; set; }
    public string Address { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? MobileNumber { get; set; }
    public string? PostalCode { get; set;}
    public string? Country { get; set; }
    public string? PersonalNumber { get; set; }
    public string? PassportNumber { get; set; }
    public string? IdCardNumber { get; set; }
    public DateTime? DeleteDateTimeUtc { get; set; }
}
