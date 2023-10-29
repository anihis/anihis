using anihis.Application.Common.Interfaces;
using anihis.Application.Species.Commands.Create;
using anihis.Application.Species.Commands.Update;
using anihis.Application.Species.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace anihis.WebAPI.Controllers;

public class SpeciesController : ApiControllerBase
{
    public SpeciesController
    (
        IMediator mediator,
        ICurrentUserService currentUserService
    )
        : base(mediator, currentUserService)
    {
    }

    [HttpGet]
    public async Task<ActionResult<List<GetSpeciesResult>>> Get()
    {
        return await Mediator.Send(new Application.Species.Queries.Get.GetSpeciesQuery());
    }

    [HttpGet("{uid}")]
    public async Task<ActionResult<GetSpeciesResult>> Get(string uid)
    {
        return await Mediator.Send(new Application.Species.Queries.GetSingle.GetSpeciesQuery { SpeciesUid = uid });
    }

    [HttpPost]
    public async Task Create(CreateSpeciesCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPut]
    public async Task Update(UpdateSpeciesCommand command)
    {
        await Mediator.Send(command);
    }
}
