using MediatR;

namespace anihis.Application.VeterinaryClinics.Queries.GetSingle;
public class GetVeterinaryClinicQuery : IRequest<GetVeterinaryClinicResult>
{
    public string VeterinaryClinicUid { get; set; }
}
