using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;

namespace anihis.Application.Animals.Commands.UpdateBreed;
public class UpdateBreedCommandHandler : IRequestHandler<UpdateBreedCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Breed> _breedRepository;
    private readonly IValidator<UpdateBreedCommand> _validator;

    public UpdateBreedCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Breed> breedRepository,
        IValidator<UpdateBreedCommand> validator
    )
    {
        _context = context;
        _breedRepository = breedRepository;
        _validator = validator;
    }

    public async Task Handle(UpdateBreedCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        await _breedRepository.ThrowIfConflict(x =>
            x.Name.ToLower() == request.Name.ToLower(),
            cancellationToken);

        var breed = await _breedRepository.GetByUidOrThrowAsync(request.BreedUid, cancellationToken);

        breed.Name = request.Name;
        _breedRepository.Update(breed);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
