using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace anihis.Application.HealthRecords.Commands.Update;
public class UpdateHealthRecordCommandHandler : IRequestHandler<UpdateHealthRecordCommand>
{
    public async Task Handle(UpdateHealthRecordCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
