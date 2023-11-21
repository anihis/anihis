using FluentValidation;

namespace anihis.Application.Animals.Commands.Create;
public class CreateAnimalCommandValidator : AbstractValidator<CreateAnimalCommand>
{
    public CreateAnimalCommandValidator()
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
