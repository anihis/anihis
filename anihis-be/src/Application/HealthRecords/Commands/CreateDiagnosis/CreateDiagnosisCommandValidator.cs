using FluentValidation;

namespace anihis.Application.HealthRecords.Commands.CreateDiagnosis;
public class CreateDiagnosisCommandValidator : AbstractValidator<CreateDiagnosisCommand>
{
    public CreateDiagnosisCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();
    }
}
