using MediatR;

namespace anihis.Application.HealthRecords.Commands.DeleteService;
public class DeleteServiceCommand : IRequest
{
    public string ServiceUid { get; set; }
}
