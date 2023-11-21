using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;

namespace anihis.Application.Veterinarians.Commands.Update;
public class UpdateVeterinarianCommandHandler : IRequestHandler<UpdateVeterinarianCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;
    private readonly IValidator<UpdateVeterinarianCommand> _validator;

    public UpdateVeterinarianCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Veterinarian> veterinarianRepository,
        IValidator<UpdateVeterinarianCommand> validator
    )
    {
        _context = context;
        _veterinarianRepository = veterinarianRepository;
        _validator = validator;
    }

    public async Task Handle(UpdateVeterinarianCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var veterinarian = await _veterinarianRepository.GetByUidOrThrowAsync(request.VeterinarianUid, cancellationToken);
        if (veterinarian is null)
        {
            throw new NotFoundException();
        }

        veterinarian.Email = request.Email;
        veterinarian.FirstName = string.IsNullOrEmpty(request.FirstName) ? veterinarian.FirstName : request.FirstName;
        veterinarian.LastName = string.IsNullOrEmpty(request.LastName) ? veterinarian.LastName : request.LastName;
        veterinarian.LicenceNumber = string.IsNullOrEmpty(request.LicenceNumber) ? veterinarian.LicenceNumber : request.LicenceNumber;
        veterinarian.MobileNumber = request.MobileNumber;
        veterinarian.PhoneNumber = request.PhoneNumber;
        //veterinarian.Username = request.Username;
        _veterinarianRepository.Update(veterinarian);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
