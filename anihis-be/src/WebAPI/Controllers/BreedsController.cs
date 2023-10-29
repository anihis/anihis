using anihis.Application.Breeds.Commands.Create;
using anihis.Application.Breeds.Commands.Update;
using anihis.Application.Breeds.Queries.Get;
using anihis.Application.Breeds.Queries.GetSingle;
using anihis.Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace anihis.WebAPI.Controllers;

public class BreedsController : ApiControllerBase
{
    public BreedsController
    (
        IMediator mediator,
        ICurrentUserService currentUserService
    )
        : base(mediator, currentUserService)
    {
    }

    [HttpGet]
    public async Task<ActionResult<List<GetBreedsResult>>> Get()
    {
        return await Mediator.Send(new GetBreedsQuery());
    }

    [HttpGet("{uid}")]
    public async Task<ActionResult<GetBreedResult>> Get(string uid)
    {
        return await Mediator.Send(new GetBreedQuery { BreedUid = uid });
    }

    [HttpPost]
    public async Task Create(CreateBreedCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPut]
    public async Task Update(UpdateBreedCommand command)
    {
        await Mediator.Send(command);
    }
}
