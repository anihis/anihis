using MediatR;

namespace anihis.Application.Prescriptions.Commands.Delete;
public class DeletePrescriptionCommand : IRequest
{
    public string PrescriptionUid { get; set; }
}
