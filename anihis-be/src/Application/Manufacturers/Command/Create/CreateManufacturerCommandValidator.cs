using FluentValidation;

namespace anihis.Application.Manufacturers.Command.Create;
public class CreateManufacturerCommandValidator : AbstractValidator<CreateManufacturerCommand>
{
    public CreateManufacturerCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();
    }
}
