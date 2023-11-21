using FluentValidation;

namespace anihis.Application.Owners.Commands.Create;
public class CreateOwnerCommandValidator : AbstractValidator<CreateOwnerCommand>
{
    public CreateOwnerCommandValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty()
            .WithMessage("The username cannot be empty.");

        RuleFor(x => x.FirstName)
            .NotEmpty()
            .WithMessage("The first name cannot be empty.");

        RuleFor(x => x.LastName)
            .NotEmpty()
            .WithMessage("The last name cannot be empty.");

        RuleFor(x => x.City)
            .NotEmpty()
            .WithMessage("The city cannot be empty.");

        RuleFor(x => x.Address)
            .NotEmpty()
            .WithMessage("The address cannot be empty.");
    }
}
