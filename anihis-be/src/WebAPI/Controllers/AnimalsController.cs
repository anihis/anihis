using anihis.Application.Animals.Commands.Create;
using anihis.Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace anihis.WebAPI.Controllers;

public class AnimalsController : ApiControllerBase
{
    public AnimalsController
    (
        IMediator mediator,
        ICurrentUserService currentUserService
    )
        : base(mediator, currentUserService)
    {
    }

    //[HttpGet]
    //public async Task<ActionResult<List<GetOwnersResult>>> Get()
    //{
    //    return await Mediator.Send(new GetOwnersQuery());
    //}

    //[HttpGet("{uid}")]
    //public async Task<ActionResult<GetOwnerResult>> Get(string uid)
    //{
    //    return await Mediator.Send(new GetOwnerQuery { Uid = uid });
    //}

    [HttpPost]
    public async Task Create(CreateAnimalCommand command)
    {
        await Mediator.Send(command);
    }
}
