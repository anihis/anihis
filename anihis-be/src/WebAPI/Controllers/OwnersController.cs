using anihis.Application.Common.Interfaces;
using anihis.Application.Owners.Commands.Create;
using anihis.Application.Owners.Queries.Get;
using anihis.Application.Owners.Queries.GetSingle;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace anihis.WebAPI.Controllers;

public class OwnersController : ApiControllerBase
{
    public OwnersController
    (
        IMediator mediator,
        ICurrentUserService currentUserService
    )
        : base(mediator, currentUserService)
    {
    }

    [HttpGet]
    public async Task<ActionResult<List<GetOwnersResult>>> Get()
    {
        return await Mediator.Send(new GetOwnersQuery());
    }

    [HttpGet("{uid}")]
    public async Task<ActionResult<GetOwnerResult>> Get(string uid)
    {
        return await Mediator.Send(new GetOwnerQuery { Uid = uid });
    }

    [HttpPost]
    public async Task Create(CreateOwnerCommand command)
    {
        await Mediator.Send(command);
    }
}
