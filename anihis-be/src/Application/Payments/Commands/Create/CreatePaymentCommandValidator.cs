using FluentValidation;

namespace anihis.Application.Payments.Commands.Create;
public class CreatePaymentCommandValidator : AbstractValidator<CreatePaymentCommand>
{
    public CreatePaymentCommandValidator()
    {
        RuleFor(x => x.OwnerUid)
            .NotEmpty();

        RuleFor(x => x.Value)
            .NotEmpty();
    }
}
