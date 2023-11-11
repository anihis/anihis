using anihis.Application.Common.Interfaces;
using anihis.Application.VeterinaryClinics.Commands.Create;
using anihis.Application.VeterinaryClinics.Queries.Get;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace anihis.WebAPI.Controllers;

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

    [HttpPost]
    public async Task Create(CreateVeterinaryClinicCommand command)
    {
        await Mediator.Send(command);
    }
}
