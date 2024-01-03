using MediatR;

namespace anihis.Application.HealthRecords.Commands.CreateService;
public class CreateServiceCommand : IRequest
{
    public string Name { get; set; }
}
