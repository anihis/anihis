using MediatR;

namespace anihis.Application.Payments.Commands.Create;
public class CreatePaymentCommand : IRequest
{
    public string OwnerUid { get; set; }
    public string Value { get; set; }

    public string VeterinarianUid { get; set; }     //TODO: REMOVE - Authorization
}
