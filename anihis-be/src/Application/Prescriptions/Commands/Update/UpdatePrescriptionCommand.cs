using MediatR;

namespace anihis.Application.Prescriptions.Commands.Update;
public class UpdatePrescriptionCommand : IRequest
{
    public string PrescriptionUid { get; set; }
    public string Name { get; set; }
    public string? AlternateName { get; set; }
    public string SerialNumber { get; set; }
    public string PrescriptionType { get; set; }
    public string? JM { get; set; }
    public string MainPrice { get; set; }
    public string? SecondPrice { get; set; }
    public string ManufacturerUid { get; set; }
}
