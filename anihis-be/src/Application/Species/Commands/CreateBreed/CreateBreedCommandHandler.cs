using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;

namespace anihis.Application.Species.Commands.CreateBreed;
public class CreateBreedCommandHandler : IRequestHandler<CreateBreedCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Breed> _breedRepository;
    private readonly IBaseRepository<Domain.Entities.Species> _speciesRepository;
    private readonly IValidator<CreateBreedCommand> _validator;

    public CreateBreedCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Breed> breedRepository,
        IBaseRepository<Domain.Entities.Species> speciesRepository,
        IValidator<CreateBreedCommand> validator
    )
    {
        _context = context;
        _breedRepository = breedRepository;
        _speciesRepository = speciesRepository;
        _validator = validator;
    }

    public async Task Handle(CreateBreedCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var species = await _speciesRepository.GetByUidOrThrowAsync(request.SpeciesUid, cancellationToken);

        _breedRepository.Insert(new Breed
        {
            Uid = Guid.NewGuid().ToString(),
            Name = request.Name,
            Species = species
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
