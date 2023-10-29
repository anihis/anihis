using anihis.Application.Common.Mappings;
using anihis.Domain.Entities;
using anihis.Domain.Enums;

namespace anihis.Application.Animals.Queries.GetSingle;
public class GetAnimalResult : IMapFrom<Animal>
{
    public string AnimalUid { get; set; }
    public string? PersonalNumber { get; set; }
    public string Name { get; set; }
    public Common.Models.Species Species { get; set; }
    public Common.Models.Breed? Breed { get; set; }
    public Gender Gender { get; set; }
    public DateTime? BirthDateTime { get; set; }
    public string? PassportNumber { get; set; }
    public Common.Models.Owner Owner { get; set; }
    public string? Warning { get; set; }
    public DateTime? LastModifiedDateTimeUtc { get; set; }
}
