using FluentValidation;

namespace anihis.Application.Prescriptions.Commands.Update;
public class UpdatePrescriptionCommandValidator : AbstractValidator<UpdatePrescriptionCommand>
{
    public UpdatePrescriptionCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();

        RuleFor(x => x.ManufacturerUid)
            .NotEmpty();

        RuleFor(x => x.SerialNumber)
            .NotEmpty();

        RuleFor(x => x.PrescriptionType)
            .NotEmpty();

        RuleFor(x => x.MainPrice)
            .NotEmpty();
    }
}
