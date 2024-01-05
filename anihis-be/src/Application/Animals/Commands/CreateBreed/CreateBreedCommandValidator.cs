using FluentValidation;

namespace anihis.Application.Animals.Commands.CreateBreed;
public class CreateBreedCommandValidator : AbstractValidator<CreateBreedCommand>
{
    public CreateBreedCommandValidator()
    {
        RuleFor(x => x.SpeciesUid)
            .NotEmpty()
            .WithMessage("Species uid is required.");

        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("The name cannot be empty.");
    }

    //public CreateBreedCommandValidator()
    //{
    //    RuleFor(x => x.SpeciesUid)
    //        .NotEmpty()
    //        .WithMessage("Species uid is required.");

    //    RuleForEach(x => x.Names)
    //        .NotEmpty()
    //        .WithMessage("The name cannot be empty.");
    //}
}
