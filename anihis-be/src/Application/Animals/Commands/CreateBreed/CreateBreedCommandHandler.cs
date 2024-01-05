using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;

namespace anihis.Application.Animals.Commands.CreateBreed;
public class CreateBreedCommandHandler : IRequestHandler<CreateBreedCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Breed> _breedRepository;
    private readonly IBaseRepository<Species> _speciesRepository;
    private readonly IValidator<CreateBreedCommand> _validator;

    public CreateBreedCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Breed> breedRepository,
        IBaseRepository<Species> speciesRepository,
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

        await _breedRepository.ThrowIfConflict(x =>
            x.Name.ToLower() == request.Name.ToLower() && x.Species == species,
            cancellationToken);

        _breedRepository.Insert(new Breed
        {
            Uid = Guid.NewGuid().ToString(),
            Name = request.Name,
            Species = species
        });

        await _context.SaveChangesAsync(cancellationToken);
    }

    //public async Task Handle(CreateBreedCommand request, CancellationToken cancellationToken)
    //{
    //    var result = await _validator.ValidateAsync(request);
    //    result.ThrowIfNotValid();

    //    var species = await _speciesRepository.GetByUidOrThrowAsync(request.SpeciesUid, cancellationToken);

    //    foreach (var name in request.Names)
    //    {
    //        await _breedRepository.ThrowIfConflict(x =>
    //            x.Name.ToLower() == name.ToLower() && x.Species == species,
    //            cancellationToken);

    //        _breedRepository.Insert(new Breed
    //        {
    //            Uid = Guid.NewGuid().ToString(),
    //            Name = name,
    //            Species = species
    //        });
    //    }
    //    await _context.SaveChangesAsync(cancellationToken);
    //}
}
