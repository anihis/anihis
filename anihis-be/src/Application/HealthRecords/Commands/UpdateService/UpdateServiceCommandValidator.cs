using FluentValidation;

namespace anihis.Application.HealthRecords.Commands.UpdateService;
public class UpdateServiceCommandValidator : AbstractValidator<UpdateServiceCommand>
{
    public UpdateServiceCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();
    }
}
