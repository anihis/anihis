using anihis.Application.Common.Interfaces;
using FluentValidation;
using MediatR;

namespace anihis.Application.Animals.Commands.CreateSpecies;
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
        result.ThrowIfNotValid();

        await _speciesRepository.ThrowIfConflict(x =>
            x.Name.ToLower() == request.Name.ToLower(),
            cancellationToken);

        _speciesRepository.Insert(new Domain.Entities.Species
        {
            Uid = Guid.NewGuid().ToString(),
            Name = request.Name
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
