using anihis.Application.Animals.Commands.Create;
using anihis.Application.Animals.Commands.CreateBreed;
using anihis.Application.Animals.Commands.CreateSpecies;
using anihis.Application.Animals.Commands.Update;
using anihis.Application.Animals.Commands.UpdateBreed;
using anihis.Application.Animals.Commands.UpdateSpecies;
using anihis.Application.Animals.Queries.Get;
using anihis.Application.Animals.Queries.GetBreed;
using anihis.Application.Animals.Queries.GetBreeds;
using anihis.Application.Animals.Queries.GetSingle;
using anihis.Application.Animals.Queries.GetSingleSpecies;
using anihis.Application.Animals.Queries.GetSpecies;
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

    [HttpGet("Species")]
    public async Task<ActionResult<GetSpeciesResult>> GetSpecies()
    {
        return await Mediator.Send(new GetSpeciesQuery());
    }

    [HttpGet("Breeds")]
    public async Task<ActionResult<List<GetBreedsResult>>> GetBreeds()
    {
        return await Mediator.Send(new GetBreedsQuery());
    }

    [HttpGet("{uid}")]
    public async Task<ActionResult<GetAnimalResult>> Get(string uid)
    {
        return await Mediator.Send(new GetAnimalQuery { AnimalUid = uid });
    }

    [HttpGet("Species/{uid}")]
    public async Task<ActionResult<GetSingleSpeciesResult>> GetSpecies(string uid)
    {
        return await Mediator.Send(new GetSingleSpeciesQuery { SpeciesUid = uid });
    }

    [HttpGet("Breeds/{uid}")]
    public async Task<ActionResult<GetBreedResult>> GetBreed(string uid)
    {
        return await Mediator.Send(new GetBreedQuery { BreedUid = uid });
    }

    [HttpPost]
    public async Task Create(CreateAnimalCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPost("Species")]
    public async Task CreateSpecies(CreateSpeciesCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPost("Breeds")]
    public async Task CreateBreed(CreateBreedCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPut("{uid}")]
    public async Task Update(string uid, UpdateAnimalCommand command)
    {
        command.AnimalUid = uid;
        await Mediator.Send(command);
    }

    [HttpPut("Species/{uid}")]
    public async Task UpdateSpecies(string uid, UpdateSpeciesCommand command)
    {
        command.SpeciesUid = uid;
        await Mediator.Send(command);
    }

    [HttpPut("Breeds/{uid}")]
    public async Task UpdateBreed(string uid, UpdateBreedCommand command)
    {
        command.BreedUid = uid;
        await Mediator.Send(command);
    }
}
