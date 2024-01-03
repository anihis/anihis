using MediatR;

namespace anihis.Application.Animals.Commands.UpdateSpecies;
public class UpdateSpeciesCommand : IRequest
{
    public string SpeciesUid { get; set; }
    public string Name { get; set; }
}
