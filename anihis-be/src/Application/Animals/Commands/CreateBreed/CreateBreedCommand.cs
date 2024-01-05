using MediatR;

namespace anihis.Application.Animals.Commands.CreateBreed;
public class CreateBreedCommand : IRequest
{
    public string Name { get; set; }
    public string SpeciesUid { get; set; }


    //public List<string> Names { get; set; }
    //public string SpeciesUid { get; set; }
}
