using FluentValidation;

namespace anihis.Application.Species.Commands.CreateBreed;
public class CreateBreedCommandValidator : AbstractValidator<CreateBreedCommand>
{
    public CreateBreedCommandValidator()
    {
        RuleFor(x => x.SpeciesUid)
            .NotEmpty()
            .WithMessage("Species uid is required.");

        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("The name cannot be null or empty.");
    }
}
