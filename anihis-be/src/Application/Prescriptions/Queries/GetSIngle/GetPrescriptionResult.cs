using anihis.Application.Common.Mappings;
using anihis.Domain.Entities;

namespace anihis.Application.Prescriptions.Queries.GetSIngle;
public class GetPrescriptionResult : IMapFrom<Prescription>
{
    public string Uid { get; set; }
    public string Name { get; set; }
    public string? AlternateName { get; set; }
    public int Code { get; set; }
    public string PrescriptionType { get; set; }
    public string? JM { get; set; }
    public string MainPrice { get; set; }
    public string? SecondPrice { get; set; }
    public string ManufacturerName { get; set; }
}
