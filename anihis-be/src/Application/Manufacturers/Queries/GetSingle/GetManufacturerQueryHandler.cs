using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace anihis.Application.Manufacturers.Queries.GetSingle;
public class GetManufacturerQueryHandler : IRequestHandler<GetManufacturerQuery, GetManufacturerResult>
{
    public GetManufacturerQueryHandler()
    {
        
    }

    public async Task<GetManufacturerResult> Handle(GetManufacturerQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
