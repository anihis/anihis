using MediatR;

namespace anihis.Application.Prescriptions.Commands.CreateManufacturer;
public class CreateManufacturerCommand : IRequest
{
    public string Name { get; set; }
    public string? City { get; set; }
    public string? Address { get; set; }
    public string? PhoneNumber { get; set; }
    public string? MobileNumber { get; set; }
    public string? BankAccount { get; set; }
    public string? ContactPerson { get; set; }
}
