using FluentValidation;

namespace anihis.Application.Prescriptions.Commands.UpdateManufacturer;
public class UpdateManufacturerCommandValidator : AbstractValidator<UpdateManufacturerCommand>
{
    public UpdateManufacturerCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();
    }
}
