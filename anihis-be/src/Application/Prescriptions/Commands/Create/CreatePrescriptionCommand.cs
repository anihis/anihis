using MediatR;

namespace anihis.Application.Prescriptions.Commands.Create;
public class CreatePrescriptionCommand : IRequest
{
    public string Name { get; set; }
    public string? AlternateName { get; set; }
    //public string SerialNumber { get; set; }
    public string PrescriptionType { get; set; }
    public string? JM { get; set; }
    public string MainPrice { get; set; }
    public string? SecondPrice { get; set; }
    public string ManufacturerUid { get; set; }
}
