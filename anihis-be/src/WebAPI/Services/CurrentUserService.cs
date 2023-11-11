using System.Security.Claims;

using anihis.Application.Common.Interfaces;

namespace anihis.WebAPI.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string? UserUid => _httpContextAccessor.HttpContext?.User?.FindFirstValue("preferred_username");
    //public string? UserUid => _httpContextAccessor.HttpContext?.User?.FindFirstValue("preferred_username"/*ClaimTypes.Name*/);
}
