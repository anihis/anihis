using MediatR;

namespace anihis.Application.Payments.Commands.Update;
public class UpdatePaymentCommand : IRequest
{
    public string PaymentUid { get; set; }
    public int Value { get; set; }
}
