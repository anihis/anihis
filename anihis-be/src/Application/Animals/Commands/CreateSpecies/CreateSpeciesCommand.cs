using MediatR;

namespace anihis.Application.Animals.Commands.CreateSpecies;
public class CreateSpeciesCommand : IRequest
{
    public string Name { get; set; }
}
