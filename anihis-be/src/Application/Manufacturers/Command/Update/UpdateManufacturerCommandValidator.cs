using FluentValidation;

namespace anihis.Application.Manufacturers.Command.Update;
public class UpdateManufacturerCommandValidator : AbstractValidator<UpdateManufacturerCommand>
{
    public UpdateManufacturerCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();
    }
}
