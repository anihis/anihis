using anihis.Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace anihis.WebAPI.Controllers;

//[Authorize]
[ApiController]
[Route("[controller]")]
public abstract class ApiControllerBase : ControllerBase
{
    protected readonly IMediator Mediator;
    protected readonly ICurrentUserService CurrentUserService;

    public ApiControllerBase
    (
        IMediator mediator,
        ICurrentUserService currentUserService
    )
    {
        Mediator = mediator;
        CurrentUserService = currentUserService;
    }
}
