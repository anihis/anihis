using MediatR;

namespace anihis.Application.Species.Commands.Update;
public class UpdateSpeciesCommand : IRequest
{
    public string SpeciesUid { get; set; }
    public string Name { get; set; }
}
