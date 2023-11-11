using anihis.Application.Common.Interfaces;
using anihis.Application.Veterinarians.Commands.Create;
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

    //[HttpGet]
    //public async Task<ActionResult<List<GetVeterinaryClinicsResult>>> Get()
    //{
    //    return await Mediator.Send(new GetVeterinaryClinicsQuery());
    //}

    [HttpPost]
    public async Task Create(CreateVeterinarianCommand command)
    {
        await Mediator.Send(command);
    }
}
