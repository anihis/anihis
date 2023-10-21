using MediatR;

namespace anihis.Application.HealthRecords.Commands.Create;
public class CreateHealthRecordCommand : IRequest
{
    public string AnimalUid { get; set; }
    public string VeterinarianUid { get; set; }
    public string? Report { get; set; }
}
