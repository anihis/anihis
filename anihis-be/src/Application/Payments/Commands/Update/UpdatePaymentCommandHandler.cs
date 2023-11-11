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

    public UpdatePaymentCommandHandler
    (
        ICoreDbContext context,
        ICurrentUserService currentUserService,
        IBaseRepository<Payment> paymentRepository
    )
    {
        _context = context;
        _currentUserService = currentUserService;
        _paymentRepository = paymentRepository;
    }

    public async Task Handle(UpdatePaymentCommand request, CancellationToken cancellationToken)
    {
        //var payment = await _paymentRepository.StartQuery()
        //    .Include(x => x.Veterinarian)
        //    .Where(x => x.Uid == request.PaymentUid && x.Veterinarian.Uid == _currentUserService.UserUid)
        //    .SingleOrDefaultAsync(cancellationToken);

        //TODO: uncomment code above and delete code below
        var payment = await _paymentRepository.StartQuery()
            .Include(x => x.Veterinarian)
            .Where(x => x.Uid == request.PaymentUid && x.Veterinarian.Uid == request.VeterinarianUid)
            .SingleOrDefaultAsync(cancellationToken);

        if (payment is null)
        {
            throw new NotFoundException();
        }

        payment.Value = request.Value;
        payment.PaymentDateTimeUtc = DateTime.UtcNow;
        _paymentRepository.Update(payment);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
