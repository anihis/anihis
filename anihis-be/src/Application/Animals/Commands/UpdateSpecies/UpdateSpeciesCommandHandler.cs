using anihis.Application.Common.Interfaces;
using FluentValidation;
using MediatR;

namespace anihis.Application.Animals.Commands.UpdateSpecies;
public class UpdateSpeciesCommandHandler : IRequestHandler<UpdateSpeciesCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Domain.Entities.Species> _speciesRepository;
    private readonly IValidator<UpdateSpeciesCommand> _validator;

    public UpdateSpeciesCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Domain.Entities.Species> speciesRepository,
        IValidator<UpdateSpeciesCommand> validator
    )
    {
        _context = context;
        _speciesRepository = speciesRepository;
        _validator = validator;
    }

    public async Task Handle(UpdateSpeciesCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        await _speciesRepository.ThrowIfConflict(x =>
            x.Name.ToLower() == request.Name.ToLower(),
            cancellationToken);

        var species = await _speciesRepository.GetByUidOrThrowAsync(request.SpeciesUid, cancellationToken);

        species.Name = request.Name;
        _speciesRepository.Update(species);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
