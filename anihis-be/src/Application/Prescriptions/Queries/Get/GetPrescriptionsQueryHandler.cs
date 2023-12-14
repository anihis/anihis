using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace anihis.Application.Prescriptions.Queries.Get;
public class GetPrescriptionsQueryHandler : IRequestHandler<GetPrescriptionsQuery, GetPrescriptionsResult>
{
    public GetPrescriptionsQueryHandler()
    {
        
    }

    public async Task<GetPrescriptionsResult> Handle(GetPrescriptionsQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
