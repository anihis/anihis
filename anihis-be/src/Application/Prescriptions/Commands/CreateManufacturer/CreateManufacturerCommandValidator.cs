using FluentValidation;

namespace anihis.Application.Prescriptions.Commands.CreateManufacturer;
public class CreateManufacturerCommandValidator : AbstractValidator<CreateManufacturerCommand>
{
    public CreateManufacturerCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();
    }
}
