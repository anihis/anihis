using MediatR;

namespace anihis.Application.Payments.Queries.Get;
public class GetPaymentsQuery : IRequest<GetPaymentsResult>
{
    public string VeterinarianUid { get; set; }     //TODO: REMOVE - Authorization
}
