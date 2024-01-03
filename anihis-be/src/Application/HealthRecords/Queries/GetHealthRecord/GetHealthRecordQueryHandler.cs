using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace anihis.Application.HealthRecords.Queries.GetHealthRecord;
public class GetHealthRecordQueryHandler : IRequestHandler<GetHealthRecordQuery, GetHealthRecordResult>
{
    private readonly ICoreDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<HealthRecord> _healthRecordRepository;
    private readonly IBaseRepository<HealthRecordDiagnosis> _healthRecordDiagnosisRepository;
    private readonly IBaseRepository<HealthRecordPrescription> _healthRecordPrescriptionRepository;
    private readonly IBaseRepository<HealthRecordService> _healthRecordServiceRepository;
    private readonly IBaseRepository<Diagnosis> _diagnosisRepository;
    private readonly IBaseRepository<Service> _serviceRepository;
    private readonly IBaseRepository<Prescription> _prescriptionRepository;
    private readonly IBaseRepository<Animal> _animalRepository;
    private readonly IBaseRepository<Veterinarian> _veterinarianRepository;

    public GetHealthRecordQueryHandler
    (
        ICoreDbContext context,
        ICurrentUserService currentUserService,
        IBaseRepository<HealthRecord> healthRecordRepository,
        IBaseRepository<HealthRecordDiagnosis> healthRecordDiagnosisRepository,
        IBaseRepository<HealthRecordPrescription> healthRecordPrescriptionRepository,
        IBaseRepository<HealthRecordService> healthRecordServiceRepository,
        IBaseRepository<Diagnosis> diagnosisRepository,
        IBaseRepository<Service> serviceRepository,
        IBaseRepository<Prescription> prescriptionRepository,
        IBaseRepository<Animal> animalRepository,
        IBaseRepository<Veterinarian> veterinarianRepository
    )
    {
        _context = context;
        _currentUserService = currentUserService;
        _healthRecordRepository = healthRecordRepository;
        _healthRecordDiagnosisRepository = healthRecordDiagnosisRepository;
        _healthRecordPrescriptionRepository = healthRecordPrescriptionRepository;
        _healthRecordServiceRepository = healthRecordServiceRepository;
        _diagnosisRepository = diagnosisRepository;
        _serviceRepository = serviceRepository;
        _prescriptionRepository = prescriptionRepository;
        _animalRepository = animalRepository;
        _veterinarianRepository = veterinarianRepository;
    }

    public async Task<GetHealthRecordResult> Handle(GetHealthRecordQuery request, CancellationToken cancellationToken)
    {
        var healthRecord = await _healthRecordRepository.StartQuery()
            .Include(x => x.Veterinarian)
            .Join(_healthRecordDiagnosisRepository.StartQuery().Include(x => x.Diagnosis),
                hr => hr.Id,
                hrd => hrd.Id,
                (x, y) => new
                {
                    hr = x,
                    hrd = y
                })
            .Join(_healthRecordServiceRepository.StartQuery().Include(x => x.Service),
                combined => combined.hr.Id,
                hrs => hrs.Id,
                (x, y) => new
                {
                    x.hr,
                    x.hrd,
                    hrs = y
                })
            .Join(_healthRecordPrescriptionRepository.StartQuery().Include(x => x.Prescription),
                combined => combined.hr.Id,
                hrp => hrp.Id,
                (x, y) => new
                {
                    x.hr,
                    x.hrd,
                    x.hrs,
                    hrp = y
                })
            .Where(x => x.hr.Uid == request.HealthRecordUid)
            //.Select(x => new
            //{
            //    hr = x.hr,
            //    hrd = x.hrd,
            //    hrs = x.hrs,
            //    hrp = x.hrp
            //})
            .ToListAsync(cancellationToken);

        if (healthRecord is null)
        {
            throw new NotFoundException();
        }

        return new GetHealthRecordResult
        {
            Anamnesis = healthRecord[0].hr.Anamnesis,
            ClinicalExamination = healthRecord[0].hr.ClinicalExamination,
            Control = healthRecord[0].hr.Control,
            Diagnoses = healthRecord.Select(x => new Models.SelectedDiagnosis
            {
                DiagnosisUid = x.hrd.Uid,
                DiagnosisNote = x.hrd.DiagnosisNote
            }).ToList(),
            Note = healthRecord[0].hr.Note,
            OtherFindings = healthRecord[0].hr.OtherFindings,
            Prescriptions = healthRecord.Select(x => new Models.SelectedPrescription
            {
                PrescriptionUid = x.hrp.Uid,
                PrescriptionNote = x.hrp.PrescriptionNote,
                PrescriptionPrice = x.hrp.PrescriptionPrice,
                PrescriptionQuantity = x.hrp.PrescriptionQuantity,
                PrescriptionTotal = x.hrp.PrescriptionTotal,
                PrescriptionVAT = x.hrp.PrescriptionVAT
            }).ToList(),
            Recommendation = healthRecord[0].hr.Recommendation,
            Services = healthRecord.Select(x => new Models.SelectedService
            {
                ServicePrice = x.hrs.ServicePrice,
                ServiceQuantity = x.hrs.ServiceQuantity,
                ServiceTotal = x.hrs.ServiceTotal,
                ServiceUid = x.hrs.Uid,
                ServiceVAT = x.hrs.ServiceVAT
            }).ToList(),
            Temperature = healthRecord[0].hr.Temperature,
            Therapy = healthRecord[0].hr.Therapy,
            Weight = healthRecord[0].hr.Weight
        };
    }
}
