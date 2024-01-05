using FluentValidation;

namespace anihis.Application.Animals.Commands.UpdateBreed;
public class UpdateBreedCommandValidator : AbstractValidator<UpdateBreedCommand>
{
    public UpdateBreedCommandValidator()
    {
        RuleFor(x => x.BreedUid)
            .NotEmpty()
            .WithMessage("Uid is required.");

        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("The name cannot be empty.");
    }

    //public UpdateBreedCommandValidator()
    //{
    //    RuleFor(x => x.SpeciesUid)
    //        .NotEmpty()
    //        .WithMessage("Species uid is required.");

    //    RuleForEach(x => x.Breeds).ChildRules(breed =>
    //    {
    //        breed.RuleFor(x => x.Uid)
    //            .NotEmpty();

    //        breed.RuleFor(x => x.Name)
    //            .NotEmpty();
    //    });
    //}
}
