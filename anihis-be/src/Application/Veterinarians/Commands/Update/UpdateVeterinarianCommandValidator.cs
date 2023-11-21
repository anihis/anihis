using FluentValidation;

namespace anihis.Application.Veterinarians.Commands.Update;
public class UpdateVeterinarianCommandValidator : AbstractValidator<UpdateVeterinarianCommand>
{
    public UpdateVeterinarianCommandValidator()
    {
        RuleFor(x => x.VeterinarianUid)
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
