using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.VeterinaryClinics.Commands.Create;
public class CreateVeterinaryClinicCommandHandler : IRequestHandler<CreateVeterinaryClinicCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<VeterinaryClinic> _veterinaryClinicRepository;

    public CreateVeterinaryClinicCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<VeterinaryClinic> veterinaryClinicRepository
    )
    {
        _context = context;
        _veterinaryClinicRepository = veterinaryClinicRepository;
    }

    public async Task Handle(CreateVeterinaryClinicCommand request, CancellationToken cancellationToken)
    {
        _veterinaryClinicRepository.Insert(new VeterinaryClinic
        {
            Uid = Guid.NewGuid().ToString(),
            Name = request.Name
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
