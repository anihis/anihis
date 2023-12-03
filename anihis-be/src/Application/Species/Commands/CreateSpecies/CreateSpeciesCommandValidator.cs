using FluentValidation;

namespace anihis.Application.Species.Commands.Create;
public class CreateSpeciesCommandValidator : AbstractValidator<CreateSpeciesCommand>
{
    public CreateSpeciesCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("The name cannot be null or empty.");
    }
}
