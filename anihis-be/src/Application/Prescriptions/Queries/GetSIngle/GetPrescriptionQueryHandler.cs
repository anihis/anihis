using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace anihis.Application.Prescriptions.Queries.GetSIngle;
public class GetPrescriptionQueryHandler : IRequestHandler<GetPrescriptionQuery, GetPrescriptionResult>
{
    public GetPrescriptionQueryHandler()
    {
        
    }

    public async Task<GetPrescriptionResult> Handle(GetPrescriptionQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
