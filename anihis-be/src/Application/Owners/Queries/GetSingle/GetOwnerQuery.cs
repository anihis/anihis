using MediatR;

namespace anihis.Application.Owners.Queries.GetSingle;
public class GetOwnerQuery : IRequest<GetOwnerResult>
{
    public string Uid { get; set; }
}
