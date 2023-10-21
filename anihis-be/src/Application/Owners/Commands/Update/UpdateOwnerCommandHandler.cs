using MediatR;

namespace anihis.Application.Owners.Commands.Update;
public class UpdateOwnerCommandHandler : IRequestHandler<UpdateOwnerCommand>
{
    public async Task Handle(UpdateOwnerCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
