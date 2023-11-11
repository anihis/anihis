namespace anihis.Application.Payments.Models;
public class Payment
{
    public string PaymentUid { get; set; }
    public string OwnerFirstName { get; set; }
    public string OwnerLastName { get; set; }
    public string VeterinarianFirstName { get; set; }
    public string VeterinarianLastName { get; set; }
    public DateTime PaymentDateTimeUtc { get; set; }
    public string Value { get; set; }
}
