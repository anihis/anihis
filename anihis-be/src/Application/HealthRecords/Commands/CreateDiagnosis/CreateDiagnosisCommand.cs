using anihis.Domain.Enums;
using MediatR;

namespace anihis.Application.HealthRecords.Commands.CreateDiagnosis;
public class CreateDiagnosisCommand : IRequest
{
    public DiagnosisType DiagnosisType { get; set; }
    public string Name { get; set; }
    //public string Code { get; set; }
}
