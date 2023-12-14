using anihis.Application.Common.Interfaces;
using anihis.Application.VeterinaryClinics.Commands.Create;
using anihis.Application.VeterinaryClinics.Commands.Update;
using anihis.Application.VeterinaryClinics.Queries.Get;
using anihis.Application.VeterinaryClinics.Queries.GetSingle;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace anihis.WebAPI.Controllers;

//[Authorize(Policy = "VeterinarianPolicy")]
public class VeterinaryClinicsControllers : ApiControllerBase
{
    public VeterinaryClinicsControllers
    (
        IMediator mediator,
        ICurrentUserService currentUserService
    )
        : base(mediator, currentUserService)
    {
    }

    [HttpGet]
    public async Task<ActionResult<List<GetVeterinaryClinicsResult>>> Get()
    {
        return await Mediator.Send(new GetVeterinaryClinicsQuery());
    }

    [HttpGet("{uid}")]
    public async Task<ActionResult<GetVeterinaryClinicResult>> GetSingle(string uid)
    {
        return await Mediator.Send(new GetVeterinaryClinicQuery { VeterinaryClinicUid = uid });
    }

    [HttpPost]
    public async Task Create(CreateVeterinaryClinicCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPut("{uid}")]
    public async Task Update(string uid, UpdateVeterinaryClinicCommand command)
    {
        command.VeterinaryClinicUid = uid;
        await Mediator.Send(command);
    }
}
