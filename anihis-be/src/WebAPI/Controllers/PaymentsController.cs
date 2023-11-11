using anihis.Application.Common.Interfaces;
using anihis.Application.Payments.Commands.Create;
using anihis.Application.Payments.Commands.Update;
using anihis.Application.Payments.Queries.Get;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace anihis.WebAPI.Controllers;

public class PaymentsController : ApiControllerBase
{
    public PaymentsController
    (
        IMediator mediator,
        ICurrentUserService currentUserService
    )
        : base(mediator, currentUserService)
    {
    }

    [HttpGet("{uid}")]
    public async Task<ActionResult<GetPaymentsResult>> Get(string uid)
    {
        return await Mediator.Send(new GetPaymentsQuery { VeterinarianUid = uid });
    }

    [HttpPost]
    public async Task Create(CreatePaymentCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPut]
    public async Task Update(UpdatePaymentCommand command)
    {
        await Mediator.Send(command);
    }
}
