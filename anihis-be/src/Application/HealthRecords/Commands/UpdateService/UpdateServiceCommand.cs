using MediatR;

namespace anihis.Application.HealthRecords.Commands.UpdateService;
public class UpdateServiceCommand : IRequest
{
    public string ServiceUid { get; set; }
    public string Name { get; set; }
}
