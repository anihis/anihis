using MediatR;

namespace anihis.Application.Species.Commands.Create;
public class CreateSpeciesCommand : IRequest
{
    public string Name { get; set; }
}
