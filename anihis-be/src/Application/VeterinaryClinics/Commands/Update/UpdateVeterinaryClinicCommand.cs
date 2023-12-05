using MediatR;

namespace anihis.Application.VeterinaryClinics.Commands.Update;
public class UpdateVeterinaryClinicCommand : IRequest
{
    public string VeterinaryClinicUid { get; set; }
    public string Name { get; set; }
}
