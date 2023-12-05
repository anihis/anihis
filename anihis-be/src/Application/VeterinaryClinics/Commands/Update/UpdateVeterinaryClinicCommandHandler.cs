using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;

namespace anihis.Application.VeterinaryClinics.Commands.Update;
public class UpdateVeterinaryClinicCommandHandler : IRequestHandler<UpdateVeterinaryClinicCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<VeterinaryClinic> _veterinaryClinicRepository;
    private readonly IValidator<UpdateVeterinaryClinicCommand> _validator;

    public UpdateVeterinaryClinicCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<VeterinaryClinic> veterinaryClinicRepository,
        IValidator<UpdateVeterinaryClinicCommand> validator
    )
    {
        _context = context;
        _veterinaryClinicRepository = veterinaryClinicRepository;
        _validator = validator;
    }

    public async Task Handle(UpdateVeterinaryClinicCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var veterinaryClinic = await _veterinaryClinicRepository.GetByUidOrThrowAsync(request.VeterinaryClinicUid, cancellationToken);
        if (veterinaryClinic is null)
        {
            throw new NotFoundException();
        }

        veterinaryClinic.Name = string.IsNullOrEmpty(request.Name) ? veterinaryClinic.Name : request.Name;
        _veterinaryClinicRepository.Update(veterinaryClinic);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
