using anihis.Application.Common.Interfaces;
using FluentValidation;
using MediatR;

namespace anihis.Application.Species.Commands.Create;
public class CreateSpeciesCommandHandler : IRequestHandler<CreateSpeciesCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Domain.Entities.Species> _speciesRepository;
    private readonly IValidator<CreateSpeciesCommand> _validator;

    public CreateSpeciesCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Domain.Entities.Species> speciesRepository,
        IValidator<CreateSpeciesCommand> validator
    )
    {
        _context = context;
        _speciesRepository = speciesRepository;
        _validator = validator;
    }

    public async Task Handle(CreateSpeciesCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        if (!result.IsValid)
        {
            throw new Common.Exceptions.ValidationException(result.Errors);
        }

        _speciesRepository.Insert(new Domain.Entities.Species
        {
            Uid = Guid.NewGuid().ToString(),
            Name = request.Name
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
