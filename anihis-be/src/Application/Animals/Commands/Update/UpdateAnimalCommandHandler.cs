using MediatR;

namespace anihis.Application.Animals.Commands.Update;
public class UpdateAnimalCommandHandler : IRequestHandler<UpdateAnimalCommand>
{
    public Task Handle(UpdateAnimalCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
