using MediatR;

namespace anihis.Application.Veterinarians.Queries.GetSingle;
public class GetVeterinarianQuery : IRequest<GetVeterinarianResult>
{
    public string Uid { get; set; }
}
