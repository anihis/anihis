using MediatR;

namespace anihis.Application.HealthRecords.Commands.DeleteDiagnosis;
public class DeleteDiagnosisCommand : IRequest
{
    public string DiagnosisUid { get; set; }
}
