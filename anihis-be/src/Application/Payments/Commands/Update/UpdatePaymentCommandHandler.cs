using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Payments.Commands.Update;
public class UpdatePaymentCommandHandler : IRequestHandler<UpdatePaymentCommand>
{
    private readonly ICoreDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<Payment> _paymentRepository;
    private readonly IBaseRepository<Owner> _ownerRepository;

    public UpdatePaymentCommandHandler
    (
        ICoreDbContext context,
        ICurrentUserService currentUserService,
        IBaseRepository<Payment> paymentRepository,
        IBaseRepository<Owner> ownerRepository
    )
    {
        _context = context;
        _currentUserService = currentUserService;
        _paymentRepository = paymentRepository;
        _ownerRepository = ownerRepository;
    }

    public async Task Handle(UpdatePaymentCommand request, CancellationToken cancellationToken)
    {
        var payment = await _paymentRepository.StartQuery()
            .Where(x => x.Uid == request.PaymentUid && x.Veterinarian.Uid == _currentUserService.UserUid)
            .SingleOrDefaultAsync(cancellationToken);

        if (payment is null)
        {
            throw new NotFoundException();
        }

        var owner = await _ownerRepository.GetByUidOrThrowAsync(payment.Owner.Uid, cancellationToken);

        owner.UnpaidExpenses += payment.Value;

        payment.Value = request.Value;
        payment.PaymentDateTimeUtc = DateTime.UtcNow;
        _paymentRepository.Update(payment);

        owner.UnpaidExpenses -= request.Value;
        _ownerRepository.Update(owner);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
