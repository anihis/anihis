using anihis.Application.Common.Interfaces;
using anihis.Application.Owners.Commands.Create;
using anihis.Application.Owners.Commands.Update;
using anihis.Application.Owners.Queries.Get;
using anihis.Application.Owners.Queries.GetSingle;
using anihis.Application.Payments.Commands.Create;
using anihis.Application.Payments.Commands.Update;
using anihis.Application.Payments.Queries.Get;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace anihis.WebAPI.Controllers;

public class OwnersController : ApiControllerBase
{
    public OwnersController
    (
        IMediator mediator,
        ICurrentUserService currentUserService
    )
        : base(mediator, currentUserService)
    {
    }

    [HttpGet]
    public async Task<ActionResult<List<GetOwnersResult>>> Get()
    {
        return await Mediator.Send(new GetOwnersQuery());
    }

    [HttpGet("{uid}")]
    public async Task<ActionResult<GetOwnerResult>> GetOwner(string uid)
    {
        return await Mediator.Send(new GetOwnerQuery { Uid = uid });
    }

    [HttpGet("{uid}/payment")]
    public async Task<ActionResult<GetPaymentsResult>> GetPayment(string uid)
    {
        return await Mediator.Send(new GetPaymentsQuery { OwnerUid = uid });
    }

    [HttpPost]
    public async Task Create(CreateOwnerCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPost("payment")]
    public async Task Create(CreatePaymentCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPut("{uid}")]
    public async Task Update(string uid, UpdateOwnerCommand command)
    {
        command.OwnerUid = uid;
        await Mediator.Send(command);
    }

    [HttpPut("{uid}/payment")]
    public async Task Update(string uid, UpdatePaymentCommand command)
    {
        command.PaymentUid = uid;
        await Mediator.Send(command);
    }
}
