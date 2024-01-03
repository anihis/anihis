namespace anihis.Domain.Entities;
public class Owner : User
{
    public string City { get; set; }
    public string Address { get; set; }
    public string? PostalCode { get; set;}
    public string? Country { get; set; }
    public string? PersonalNumber { get; set; }
    public string? PassportNumber { get; set; }
    public string? IdCardNumber { get; set; }
    public DateTime? LastModifiedDateTimeUtc { get; set; }
    //public DateTime? DeleteDateTimeUtc { get; set; }
    public string? Warning { get; set; }
    public int? UnpaidExpenses { get; set; }
    //Popust - discount
}
