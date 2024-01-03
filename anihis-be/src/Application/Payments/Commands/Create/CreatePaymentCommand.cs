using MediatR;

namespace anihis.Application.Payments.Commands.Create;
public class CreatePaymentCommand : IRequest
{
    public string OwnerUid { get; set; }
    public int Value { get; set; }
}
