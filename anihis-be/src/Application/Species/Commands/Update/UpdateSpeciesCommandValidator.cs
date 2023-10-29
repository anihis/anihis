using FluentValidation;

namespace anihis.Application.Species.Commands.Update;
public class UpdateSpeciesCommandValidator : AbstractValidator<UpdateSpeciesCommand>
{
    public UpdateSpeciesCommandValidator()
    {
        RuleFor(x => x.SpeciesUid)
            .NotEmpty()
            .WithMessage("Uid is required.");

        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("The name cannot be null or empty.");
    }
}
