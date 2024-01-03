using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Payments.Commands.Create;
public class CreatePaymentCommandHandler : IRequestHandler<CreatePaymentCommand>
{
    private readonly ICoreDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<Payment> _paymentRepository;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;
    private readonly IBaseRepository<Owner> _ownerRepository;

    public CreatePaymentCommandHandler
    (
        ICoreDbContext context,
        ICurrentUserService currentUserService,
        IBaseRepository<Payment> paymentRepository,
        IBaseRepository<Veterinarian> veterinarianRepository,
        IBaseRepository<Owner> ownerRepository
    )
    {
        _context = context;
        _currentUserService = currentUserService;
        _paymentRepository = paymentRepository;
        _veterinarianRepository = veterinarianRepository;
        _ownerRepository = ownerRepository;
    }

    public async Task Handle(CreatePaymentCommand request, CancellationToken cancellationToken)
    {
        var veterinarian = await _veterinarianRepository.StartQuery()
            .Include(x => x.VeterinaryClinic)
            .Where(x => x.Uid == _currentUserService.UserUid)
            .SingleOrDefaultAsync(cancellationToken);

        var owner = await _ownerRepository.GetByUidOrThrowAsync(request.OwnerUid, cancellationToken);

        if (owner.UnpaidExpenses <= 0)
        {
            throw new ValidationException();
        }

        _paymentRepository.Insert(new Payment
        {
            Uid = Guid.NewGuid().ToString(),
            Owner = owner,
            PaymentDateTimeUtc = DateTime.UtcNow,
            Value = request.Value,
            Veterinarian = veterinarian,
            VeterinaryClinic = veterinarian.VeterinaryClinic
        });

        owner.UnpaidExpenses -= request.Value;
        _ownerRepository.Update(owner);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
