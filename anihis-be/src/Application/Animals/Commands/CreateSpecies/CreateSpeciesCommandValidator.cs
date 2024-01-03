using FluentValidation;

namespace anihis.Application.Animals.Commands.CreateSpecies;
public class CreateSpeciesCommandValidator : AbstractValidator<CreateSpeciesCommand>
{
    public CreateSpeciesCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();
    }
}
