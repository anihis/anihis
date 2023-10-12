using anihis.Application.Common.Interfaces;
using anihis.Application.Users.Commands.Create;
using anihis.Application.Users.Queries.Get;
using anihis.Application.Users.Queries.GetSingle;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace anihis.WebAPI.Controllers;

public class UsersController : ApiControllerBase
{
    public UsersController
    (
        IMediator mediator,
        ICurrentUserService currentUserService
    )
        : base(mediator, currentUserService)
    {
    }

    [HttpGet]
    public async Task<ActionResult<List<GetUsersResult>>> Get()
    {
        return await Mediator.Send(new GetUsersQuery());
    }

    [HttpGet("{uid}")]
    public async Task<ActionResult<GetUserResult>> Get(string uid)
    {
        return await Mediator.Send(new GetUserQuery { Uid = uid });
    }

    [HttpPost]
    public async Task Create(CreateUserCommand command)
    {
        await Mediator.Send(command);
    }
}
