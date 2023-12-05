using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.VeterinaryClinics.Commands.Create;
public class CreateVeterinaryClinicCommandHandler : IRequestHandler<CreateVeterinaryClinicCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<VeterinaryClinic> _veterinaryClinicRepository;
    private readonly IValidator<CreateVeterinaryClinicCommand> _validator;

    public CreateVeterinaryClinicCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<VeterinaryClinic> veterinaryClinicRepository,
        IValidator<CreateVeterinaryClinicCommand> validator
    )
    {
        _context = context;
        _veterinaryClinicRepository = veterinaryClinicRepository;
        _validator = validator;
    }

    public async Task Handle(CreateVeterinaryClinicCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var veterinaryClinic = await _veterinaryClinicRepository.StartQuery()
            .Where(x => x.Name == request.Name)
            .SingleOrDefaultAsync(cancellationToken);

        //TODO: check does clinic exists

        _veterinaryClinicRepository.Insert(new VeterinaryClinic
        {
            Uid = Guid.NewGuid().ToString(),
            Name = request.Name
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
