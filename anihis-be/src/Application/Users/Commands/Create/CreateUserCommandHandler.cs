using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using MediatR;

namespace anihis.Application.Users.Commands.Create;
public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand>
{
    private readonly ICoreDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IBaseRepository<User> _userRepository;

    public CreateUserCommandHandler
    (
        ICoreDbContext context, 
        ICurrentUserService currentUserService,
        IBaseRepository<User> userRepository
    )
    {
        _context = context;
        _currentUserService = currentUserService;
        _userRepository = userRepository;
    }

    public async Task Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        _userRepository.Insert(new User
        {
            Uid = Guid.NewGuid().ToString(),
            //Uid = "test",
        });

        await _context.SaveChangesAsync(cancellationToken);
    }
}
