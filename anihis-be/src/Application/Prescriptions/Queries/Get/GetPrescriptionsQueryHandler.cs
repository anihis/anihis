using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Prescriptions.Queries.Get;
public class GetPrescriptionsQueryHandler : IRequestHandler<GetPrescriptionsQuery, GetPrescriptionsResult>
{
    private readonly IBaseRepository<Prescription> _prescriptionRepository;

    public GetPrescriptionsQueryHandler
    (
        IBaseRepository<Prescription> prescriptionRepository
    )
    {
        _prescriptionRepository = prescriptionRepository;
    }

    public async Task<GetPrescriptionsResult> Handle(GetPrescriptionsQuery request, CancellationToken cancellationToken)
    {
        var prescriptions = await _prescriptionRepository.StartQuery()
            .Include(x => x.Manufacturer)
            .ToListAsync(cancellationToken);

        return new GetPrescriptionsResult
        {
            Prescriptions = prescriptions.Select(prescription => new Models.Prescription
            {
                AlternateName = prescription.AlternateName,
                Code = prescription.Code,
                JM = prescription.JM,
                MainPrice = prescription.MainPrice,
                ManufacturerName = prescription.Manufacturer.Name,
                Name = prescription.Name,
                PrescriptionType = prescription.PrescriptionType,
                SecondPrice = prescription.SecondPrice
            }).ToList()
        };
    }
}
