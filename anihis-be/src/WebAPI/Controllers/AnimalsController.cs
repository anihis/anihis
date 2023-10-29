using anihis.Application.Animals.Commands.Create;
using anihis.Application.Animals.Commands.Update;
using anihis.Application.Animals.Queries.Get;
using anihis.Application.Animals.Queries.GetSingle;
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

    [HttpGet]
    public async Task<ActionResult<List<GetAnimalsResult>>> Get()
    {
        return await Mediator.Send(new GetAnimalsQuery());
    }

    [HttpGet("{uid}")]
    public async Task<ActionResult<GetAnimalResult>> Get(string uid)
    {
        return await Mediator.Send(new GetAnimalQuery { AnimalUid = uid });
    }

    [HttpPost]
    public async Task Create(CreateAnimalCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPut]
    public async Task Update(UpdateAnimalCommand command)
    {
        await Mediator.Send(command);
    }
}
