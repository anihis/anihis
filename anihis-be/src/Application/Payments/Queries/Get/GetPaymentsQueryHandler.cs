using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Payments.Queries.Get;
public class GetPaymentsQueryHandler : IRequestHandler<GetPaymentsQuery, GetPaymentsResult>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<Payment> _paymentRepository;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;

    public GetPaymentsQueryHandler
    (
        ICurrentUserService currentUserService,
        IBaseRepository<Payment> paymentRepository,
        IBaseRepository<Veterinarian> veterinarianRepository
    )
    {
        _currentUserService = currentUserService;
        _paymentRepository = paymentRepository;
        _veterinarianRepository = veterinarianRepository;
    }

    public async Task<GetPaymentsResult> Handle(GetPaymentsQuery request, CancellationToken cancellationToken)
    {
        //var veterinarian = await _veterinarianRepository.GetByUidOrThrowAsync(_currentUserService.UserUid, cancellationToken);

        //TODO: uncomment code above and delete code below
        var veterinarian = await _veterinarianRepository.StartQuery()
            .Include(x => x.VeterinaryClinic)
            .Where(x => x.Uid == request.VeterinarianUid)
            .SingleOrDefaultAsync(cancellationToken);

        var payments = await _paymentRepository.StartQuery()
            .Include(x => x.Owner)
            .Include(x => x.VeterinaryClinic)
            .Where(x => x.VeterinaryClinic == veterinarian.VeterinaryClinic)
            .ToListAsync(cancellationToken);

        return new GetPaymentsResult
        {
            Payments = payments.Select(payment => new Models.Payment
            {
                OwnerFirstName = payment.Owner.FirstName,
                OwnerLastName = payment.Owner.LastName,
                PaymentDateTimeUtc = payment.PaymentDateTimeUtc,
                PaymentUid = payment.Uid,
                Value = payment.Value,
                VeterinarianFirstName = payment.Veterinarian.FirstName,
                VeterinarianLastName = payment.Veterinarian.LastName
            }).ToList()
        };
    }
}
