using FluentValidation;

namespace anihis.Application.HealthRecords.Commands.UpdateDiagnosis;
public class UpdateDiagnosisCommandValidator : AbstractValidator<UpdateDiagnosisCommand>
{
    public UpdateDiagnosisCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();
    }
}
