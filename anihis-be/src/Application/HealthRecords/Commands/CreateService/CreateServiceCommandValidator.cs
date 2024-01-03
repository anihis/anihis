using FluentValidation;

namespace anihis.Application.HealthRecords.Commands.CreateService;
public class CreateServiceCommandValidator : AbstractValidator<CreateServiceCommand>
{
    public CreateServiceCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty();
    }
}
