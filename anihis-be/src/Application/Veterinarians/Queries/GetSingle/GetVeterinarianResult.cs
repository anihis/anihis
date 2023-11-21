using anihis.Application.Common.Mappings;
using anihis.Application.Common.Models;

namespace anihis.Application.Veterinarians.Queries.GetSingle;
public class GetVeterinarianResult : IMapFrom<Veterinarian>
{
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? MobileNumber { get; set; }
    public string LicenceNumber { get; set; }
    public VeterinaryClinic VeterinaryClinic { get; set; }
}
