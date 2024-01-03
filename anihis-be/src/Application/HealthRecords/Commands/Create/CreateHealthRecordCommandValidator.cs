using FluentValidation;

namespace anihis.Application.HealthRecords.Commands.Create;
public class CreateHealthRecordCommandValidator : AbstractValidator<CreateHealthRecordCommand>
{
    public CreateHealthRecordCommandValidator()
    {
        RuleFor(x => x.Anamnesis)
            .NotEmpty();

        RuleFor(x => x.ClinicalExamination)
            .NotEmpty();
    }
}
