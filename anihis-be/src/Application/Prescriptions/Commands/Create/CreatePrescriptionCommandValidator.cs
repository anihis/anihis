using FluentValidation;

namespace anihis.Application.Prescriptions.Commands.Create;
public class CreatePrescriptionCommandValidator : AbstractValidator<CreatePrescriptionCommand>
{
    public CreatePrescriptionCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();

        RuleFor(x => x.ManufacturerUid)
            .NotEmpty();

        //RuleFor(x => x.SerialNumber)
        //    .NotEmpty();

        RuleFor(x => x.PrescriptionType)
            .NotEmpty();

        RuleFor(x => x.MainPrice)
            .NotEmpty();
    }
}
