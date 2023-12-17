using MediatR;

namespace anihis.Application.Manufacturers.Command.Delete;
public class DeleteManufacturerCommand : IRequest
{
    public string ManufacturerUid { get; set; }
}
