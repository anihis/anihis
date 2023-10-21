using MediatR;

namespace anihis.Application.Animals.Commands.Delete;
public class DeleteAnimalCommandHandler : IRequestHandler<DeleteAnimalCommand>
{
    public Task Handle(DeleteAnimalCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
