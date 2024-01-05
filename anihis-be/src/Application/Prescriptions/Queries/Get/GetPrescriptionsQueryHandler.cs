using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Prescriptions.Queries.Get;
public class GetPrescriptionsQueryHandler : IRequestHandler<GetPrescriptionsQuery, GetPrescriptionsResult>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<Prescription> _prescriptionRepository;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;

    public GetPrescriptionsQueryHandler
    (
        ICurrentUserService currentUserService,
        IBaseRepository<Prescription> prescriptionRepository,
        IBaseRepository<Veterinarian> veterinarianRepository
    )
    {
        _currentUserService = currentUserService;
        _prescriptionRepository = prescriptionRepository;
        _veterinarianRepository = veterinarianRepository;
    }

    public async Task<GetPrescriptionsResult> Handle(GetPrescriptionsQuery request, CancellationToken cancellationToken)
    {
        var veterinarian = await _veterinarianRepository.StartQuery()
            .Include(x => x.VeterinaryClinic)
            .Where(x => x.Uid == _currentUserService.UserUid)
            .SingleOrDefaultAsync(cancellationToken);

        var prescriptions = await _prescriptionRepository.StartQuery()
            .Include(x => x.Manufacturer)
            .Where(x => x.VeterinaryClinic == veterinarian.VeterinaryClinic)
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
