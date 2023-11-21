using FluentValidation;

namespace anihis.Application.Veterinarians.Commands.Create;
public class CreateVeterinarianCommandValidator : AbstractValidator<CreateVeterinarianCommand>
{
    public CreateVeterinarianCommandValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty();

        RuleFor(x => x.FirstName)
            .NotEmpty();

        RuleFor(x => x.LastName)
            .NotEmpty();

        RuleFor(x => x.LicenceNumber)
            .NotEmpty();

        RuleFor(x => x.VeterinaryClinicUid)
            .NotEmpty();
    }
}
