using MediatR;

namespace anihis.Application.Species.Commands.CreateBreed;
public class CreateBreedCommand : IRequest
{
    public string Name { get; set; }
    public string SpeciesUid { get; set; }
}
