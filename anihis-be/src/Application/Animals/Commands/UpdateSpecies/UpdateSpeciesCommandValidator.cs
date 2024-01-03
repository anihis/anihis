using FluentValidation;

namespace anihis.Application.Animals.Commands.UpdateSpecies;
public class UpdateSpeciesCommandValidator : AbstractValidator<UpdateSpeciesCommand>
{
    public UpdateSpeciesCommandValidator()
    {
        RuleFor(x => x.SpeciesUid)
            .NotEmpty()
            .WithMessage("Uid is required.");

        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("The name cannot be empty.");
    }
}
