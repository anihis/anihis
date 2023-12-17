using MediatR;

namespace anihis.Application.Manufacturers.Command.Update;
public class UpdateManufacturerCommand : IRequest
{
    public string ManufacturerUid { get; set; }
    public string Name { get; set; }
    public string? City { get; set; }
    public string? Address { get; set; }
    public string? PhoneNumber { get; set; }
    public string? MobileNumber { get; set; }
    public string? BankAccount { get; set; }
    public string? ContactPerson { get; set; }
}
