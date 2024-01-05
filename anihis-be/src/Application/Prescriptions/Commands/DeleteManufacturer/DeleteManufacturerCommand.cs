using MediatR;

namespace anihis.Application.Prescriptions.Commands.DeleteManufacturer;
public class DeleteManufacturerCommand : IRequest
{
    public string ManufacturerUid { get; set; }
}
