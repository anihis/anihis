using FluentValidation;

namespace anihis.Application.Animals.Commands.Update;
public class UpdateAnimalCommandValidator : AbstractValidator<UpdateAnimalCommand>
{
    public UpdateAnimalCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();

        RuleFor(x => x.Gender)
            .IsInEnum();

        RuleFor(x => x.OwnerUid)
            .NotEmpty();

        RuleFor(x => x.BreedUid)
            .NotEmpty();
    }
}
