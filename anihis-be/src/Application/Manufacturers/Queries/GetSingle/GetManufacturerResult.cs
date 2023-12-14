using anihis.Application.Common.Mappings;
using anihis.Domain.Entities;

namespace anihis.Application.Manufacturers.Queries.GetSingle;
public class GetManufacturerResult : IMapFrom<Manufacturer>
{
    public string Uid { get; set; }
    public string Name { get; set; }
    public string? City { get; set; }
    public string? Address { get; set; }
    public string? PhoneNumber { get; set; }
    public string? MobileNumber { get; set; }
    public string? BankAccount { get; set; }
    public string? ContactPerson { get; set; }
}
