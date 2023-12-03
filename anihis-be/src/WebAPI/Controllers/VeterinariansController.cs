using anihis.Application.Common.Interfaces;
using anihis.Application.Veterinarians.Commands.Create;
using anihis.Application.Veterinarians.Commands.Update;
using anihis.Application.Veterinarians.Queries.Get;
using anihis.Application.Veterinarians.Queries.GetSingle;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace anihis.WebAPI.Controllers;

public class VeterinariansController : ApiControllerBase
{
    public VeterinariansController
    (
        IMediator mediator,
        ICurrentUserService currentUserService
    )
        : base(mediator, currentUserService)
    {
    }

    [HttpGet]
    public async Task<ActionResult<GetVeterinariansResult>> Get()
    {
        return await Mediator.Send(new GetVeterinariansQuery());
    }

    [HttpGet("{uid}")]
    public async Task<ActionResult<GetVeterinarianResult>> GetSingle(string uid)
    {
        return await Mediator.Send(new GetVeterinarianQuery { Uid = uid });
    }

    [HttpPost]
    public async Task Create(CreateVeterinarianCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPut("{uid}")]
    public async Task Update(string uid, UpdateVeterinarianCommand command)
    {
        command.VeterinarianUid = uid;
        await Mediator.Send(command);
    }
}
