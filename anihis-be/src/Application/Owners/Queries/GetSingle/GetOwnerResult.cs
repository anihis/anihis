using anihis.Application.Common.Mappings;
using anihis.Domain.Entities;

namespace anihis.Application.Owners.Queries.GetSingle;
public class GetOwnerResult : IMapFrom<Owner>
{
    public string? Uid { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? MobileNumber { get; set; }
    public string City { get; set; }
    public string Address { get; set; }
    public string? PostalCode { get; set; }
    public string? Country { get; set; }
    public string? PersonalNumber { get; set; }
    public string? PassportNumber { get; set; }
    public string? IdCardNumber { get; set; }
    public string? Warning { get; set; }
    public int? UnpaidExpenses { get; set; }
}
