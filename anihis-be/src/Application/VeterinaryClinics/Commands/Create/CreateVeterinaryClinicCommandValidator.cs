using FluentValidation;

namespace anihis.Application.VeterinaryClinics.Commands.Create;
public class CreateVeterinaryClinicCommandValidator : AbstractValidator<CreateVeterinaryClinicCommand>
{
    public CreateVeterinaryClinicCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();
    }
}
