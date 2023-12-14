using MediatR;

namespace anihis.Application.Prescriptions.Queries.GetSIngle;
public class GetPrescriptionQuery : IRequest<GetPrescriptionResult>
{
    public string PrescriptionUid { get; set; }
}
