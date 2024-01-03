using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Manufacturers.Command.Create;
public class CreateManufacturerCommandHandler : IRequestHandler<CreateManufacturerCommand>
{
    private readonly ICoreDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<Manufacturer> _manufacturerRepository;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;
    private readonly IValidator<CreateManufacturerCommand> _validator;

    public CreateManufacturerCommandHandler
    (
        ICoreDbContext context,
        ICurrentUserService currentUserService,
        IBaseRepository<Manufacturer> manufacturerRepository,
        IBaseRepository<Veterinarian> veterinarianRepository,
        IValidator<CreateManufacturerCommand> validator
    )
    {
        _context = context;
        _currentUserService = currentUserService;
        _manufacturerRepository = manufacturerRepository;
        _veterinarianRepository = veterinarianRepository;
        _validator = validator;
    }

    public async Task Handle(CreateManufacturerCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var veterinarian = await _veterinarianRepository.StartQuery()
            .Include(x => x.VeterinaryClinic)
            .Where(x => x.Uid == _currentUserService.UserUid)
            .SingleOrDefaultAsync(cancellationToken);

        await _manufacturerRepository.ThrowIfConflict(x =>
            x.Name.ToLower() == request.Name.ToLower() && x.VeterinaryClinic == veterinarian.VeterinaryClinic,
            cancellationToken);

        _manufacturerRepository.Insert(new Manufacturer
        {
            Address = request.Address,
            BankAccount = request.BankAccount,
            City = request.City,
            ContactPerson = request.ContactPerson,
            MobileNumber = request.MobileNumber,
            Name = request.Name,
            PhoneNumber = request.PhoneNumber,
            Uid = Guid.NewGuid().ToString(),
            VeterinaryClinic = veterinarian.VeterinaryClinic
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
