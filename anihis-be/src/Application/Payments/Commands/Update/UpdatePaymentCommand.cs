using MediatR;

namespace anihis.Application.Payments.Commands.Update;
public class UpdatePaymentCommand : IRequest
{
    public string PaymentUid { get; set; }
    public string Value { get; set; }

    public string VeterinarianUid { get; set; }     //TODO: REMOVE - Authorization
}
