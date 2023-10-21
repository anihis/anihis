using anihis.Application.Common.Interfaces;
using MediatR;

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
    //public async Task<ActionResult<List<GetOwnersResult>>> Get()
    //{
    //    return await Mediator.Send(new GetOwnersQuery());
    //}

    //[HttpGet("{uid}")]
    //public async Task<ActionResult<GetOwnerResult>> Get(string uid)
    //{
    //    return await Mediator.Send(new GetOwnerQuery { Uid = uid });
    //}

    //[HttpPost]
    //public async Task Create(CreateOwnerCommand command)
    //{
    //    await Mediator.Send(command);
    //}
}
