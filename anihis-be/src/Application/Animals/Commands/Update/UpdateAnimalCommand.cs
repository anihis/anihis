using anihis.Domain.Enums;
using MediatR;

namespace anihis.Application.Animals.Commands.Update;
public class UpdateAnimalCommand : IRequest
{
    public string AnimalUid { get; set; }
    public string? PersonalNumber { get; set; }
    public string Name { get; set; }
    public string? BreedUid { get; set; }
    public Gender Gender { get; set; }
    public DateTime? BirthDateTime { get; set; }
    public string? PassportNumber { get; set; }
    public string OwnerUid { get; set; }
    public string? Warning { get; set; }
}
