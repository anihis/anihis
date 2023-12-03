using FluentValidation;

namespace anihis.Application.Owners.Commands.Update;
public class UpdateOwnerCommandValidator : AbstractValidator<UpdateOwnerCommand>
{
    public UpdateOwnerCommandValidator()
    {
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
