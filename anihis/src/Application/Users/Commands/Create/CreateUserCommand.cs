using MediatR;

namespace anihis.Application.Users.Commands.Create;
public class CreateUserCommand : IRequest
{
    public string? Name { get; set; }
}
