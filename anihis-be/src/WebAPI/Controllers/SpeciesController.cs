using anihis.Application.Common.Interfaces;
using anihis.Application.Species.Commands.Create;
using anihis.Application.Species.Commands.CreateBreed;
using anihis.Application.Species.Commands.Update;
using anihis.Application.Species.Commands.UpdateBreed;
using anihis.Application.Species.Queries;
using anihis.Application.Species.Queries.GetBreed;
using anihis.Application.Species.Queries.GetBreeds;
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

    [HttpGet("species")]
    public async Task<ActionResult<List<GetSpeciesResult>>> GetSpecies()
    {
        return await Mediator.Send(new Application.Species.Queries.Get.GetSpeciesQuery());
    }

    [HttpGet("breeds")]
    public async Task<ActionResult<List<GetBreedsResult>>> GetBreeds()
    {
        return await Mediator.Send(new GetBreedsQuery());
    }

    [HttpGet("species/{uid}")]
    public async Task<ActionResult<GetSpeciesResult>> GetSpecies(string uid)
    {
        return await Mediator.Send(new Application.Species.Queries.GetSingle.GetSpeciesQuery { SpeciesUid = uid });
    }

    [HttpGet("breeds/{uid}")]
    public async Task<ActionResult<GetBreedResult>> GetBreed(string uid)
    {
        return await Mediator.Send(new GetBreedQuery { BreedUid = uid });
    }

    [HttpPost("species")]
    public async Task CreateSpecies(CreateSpeciesCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPost("breeds")]
    public async Task CreateBreed(CreateBreedCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPut("species/{uid}")]
    public async Task UpdateSpecies(string uid, UpdateSpeciesCommand command)
    {
        command.SpeciesUid = uid;
        await Mediator.Send(command);
    }

    [HttpPut("breeds/{uid}")]
    public async Task UpdateBreed(string uid, UpdateBreedCommand command)
    {
        command.BreedUid = uid;
        await Mediator.Send(command);
    }
}
