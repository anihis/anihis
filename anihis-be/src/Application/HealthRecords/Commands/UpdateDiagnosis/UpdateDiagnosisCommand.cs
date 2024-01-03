using MediatR;

namespace anihis.Application.HealthRecords.Commands.UpdateDiagnosis;
public class UpdateDiagnosisCommand : IRequest
{
    public string DiagnosisUid { get; set; }
    public string Name { get; set; }
}
