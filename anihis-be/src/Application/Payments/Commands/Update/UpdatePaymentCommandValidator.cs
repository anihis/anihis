using FluentValidation;

namespace anihis.Application.Payments.Commands.Update;
public class UpdatePaymentCommandValidator : AbstractValidator<UpdatePaymentCommand>
{
    public UpdatePaymentCommandValidator()
    {
        RuleFor(x => x.PaymentUid)
            .NotEmpty();

        RuleFor(x => x.Value)
            .NotEmpty();
    }
}
