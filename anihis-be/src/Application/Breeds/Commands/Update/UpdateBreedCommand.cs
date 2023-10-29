using MediatR;

namespace anihis.Application.Breeds.Commands.Update;
public class UpdateBreedCommand : IRequest
{
    public string BreedUid { get; set; }
    public string Name { get; set; }
}
