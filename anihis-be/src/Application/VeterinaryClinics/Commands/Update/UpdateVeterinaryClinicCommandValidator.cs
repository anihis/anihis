using FluentValidation;

namespace anihis.Application.VeterinaryClinics.Commands.Update;
public class UpdateVeterinaryClinicCommandValidator : AbstractValidator<UpdateVeterinaryClinicCommand>
{
    public UpdateVeterinaryClinicCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();
    }
}
