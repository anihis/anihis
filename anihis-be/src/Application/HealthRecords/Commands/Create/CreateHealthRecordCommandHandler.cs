using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;

namespace anihis.Application.HealthRecords.Commands.Create;
public class CreateHealthRecordCommandHandler : IRequestHandler<CreateHealthRecordCommand>
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
    private readonly IValidator<CreateHealthRecordCommand> _validator;

    public CreateHealthRecordCommandHandler
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
        IBaseRepository<Veterinarian> veterinarianRepository,
        IValidator<CreateHealthRecordCommand> validator
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
        _validator = validator;
    }

    public async Task Handle(CreateHealthRecordCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var veterinarian = await _veterinarianRepository.GetByUidOrThrowAsync(_currentUserService.UserUid, cancellationToken);
        var animal = await _animalRepository.GetByUidOrThrowAsync(request.AnimalUid, cancellationToken);

        var healthRecord = new HealthRecord
        {
            Anamnesis = request.Anamnesis,
            Animal = animal,
            ClinicalExamination = request.ClinicalExamination,
            Control = request.Control,
            CreateDateTimeUtc = DateTime.UtcNow,
            LastModifiedDateTimeUtc = DateTime.UtcNow,
            Note = request.Note,
            OtherFindings = request.OtherFindings,
            Recommendation = request.Recommendation,
            Temperature = request.Temperature,
            Therapy = request.Therapy,
            Veterinarian = veterinarian,
            Weight = request.Weight,
            Uid = Guid.NewGuid().ToString()
        };
        _healthRecordRepository.Insert(healthRecord);

        foreach (var d in request.Diagnoses)
        {
            var diagnosis = await _diagnosisRepository.GetByUidOrThrowAsync(d.DiagnosisUid, cancellationToken);
            _healthRecordDiagnosisRepository.Insert(new HealthRecordDiagnosis
            {
                Diagnosis = diagnosis,
                DiagnosisNote = d.DiagnosisNote,
                HealthRecord = healthRecord,
                Uid = Guid.NewGuid().ToString()
            });
        }

        foreach (var s in request.Services)
        {
            var service = await _serviceRepository.GetByUidOrThrowAsync(s.ServiceUid, cancellationToken);
            var x = int.Parse(s.ServicePrice) * int.Parse(s.ServiceQuantity);
            _healthRecordServiceRepository.Insert(new HealthRecordService
            {
                HealthRecord = healthRecord,
                Service = service,
                ServicePrice = s.ServicePrice,
                ServiceQuantity = s.ServiceQuantity,
                ServiceTotal = (x += (x * int.Parse(s.ServiceVAT)) / 100).ToString(),
                ServiceVAT = s.ServiceVAT,
                Uid = Guid.NewGuid().ToString()
            });
        }

        foreach (var p in request.Prescriptions)
        {
            var prescription = await _prescriptionRepository.GetByUidOrThrowAsync(p.PrescriptionUid, cancellationToken);
            var x = int.Parse(p.PrescriptionPrice) * int.Parse(p.PrescriptionQuantity);
            _healthRecordPrescriptionRepository.Insert(new HealthRecordPrescription
            {
                HealthRecord = healthRecord,
                Prescription = prescription,
                PrescriptionNote = p.PrescriptionNote,
                PrescriptionPrice = p.PrescriptionPrice,
                PrescriptionQuantity = p.PrescriptionQuantity,
                PrescriptionTotal = (x += (x * int.Parse(p.PrescriptionVAT)) / 100).ToString(),
                PrescriptionVAT = p.PrescriptionVAT,
                Uid = Guid.NewGuid().ToString()
            });
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}
