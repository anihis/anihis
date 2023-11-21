using anihis.Application.Common.Interfaces;
using anihis.Application.Owners.Commands.Create;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;

namespace anihis.Application.Veterinarians.Commands.Create;
public class CreateVeterinarianCommandHandler : IRequestHandler<CreateVeterinarianCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;
    private readonly IBaseRepository<VeterinaryClinic> _veterinaryClinicRepository;
    private readonly IValidator<CreateVeterinarianCommand> _validator;

    public CreateVeterinarianCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Veterinarian> veterinarianRepository,
        IBaseRepository<VeterinaryClinic> veterinaryClinicRepository,
        IValidator<CreateVeterinarianCommand> validator
    )
    {
        _context = context;
        _veterinarianRepository = veterinarianRepository;
        _veterinaryClinicRepository = veterinaryClinicRepository;
        _validator = validator;
    }

    public async Task Handle(CreateVeterinarianCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var veterinaryClinic = await _veterinaryClinicRepository.GetByUidOrThrowAsync(request.VeterinaryClinicUid, cancellationToken);

        _veterinarianRepository.Insert(new Veterinarian
        {
            Uid = Guid.NewGuid().ToString(),
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            LicenceNumber = request.LicenceNumber,
            MobileNumber = request.MobileNumber,
            PhoneNumber = request.PhoneNumber,
            Username = request.Username,
            VeterinaryClinic = veterinaryClinic
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
