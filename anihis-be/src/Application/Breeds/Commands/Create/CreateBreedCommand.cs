using MediatR;

namespace anihis.Application.Breeds.Commands.Create;
public class CreateBreedCommand : IRequest
{
    public string Name { get; set; }
    public string SpeciesUid { get; set; }
}
