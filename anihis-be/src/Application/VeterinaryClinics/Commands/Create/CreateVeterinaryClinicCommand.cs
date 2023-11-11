using MediatR;

namespace anihis.Application.VeterinaryClinics.Commands.Create;
public class CreateVeterinaryClinicCommand : IRequest
{
    public string Name { get; set; }
}
