using MediatR;

namespace anihis.Application.Veterinarians.Commands.Update;
public class UpdateVeterinarianCommandHandler : IRequestHandler<UpdateVeterinarianCommand>
{
    public async Task Handle(UpdateVeterinarianCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
