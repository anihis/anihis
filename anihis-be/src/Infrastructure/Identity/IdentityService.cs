using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using Microsoft.AspNetCore.Authorization;

namespace anihis.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly IBaseRepository<User> _baseRepository;

    public IdentityService(
        IBaseRepository<User> baseRepository,
        IAuthorizationService authorizationService)
    {
        _baseRepository = baseRepository;
    }

    public async Task<string?> GetUserNameAsync(string userId)
    {
        var user = await _baseRepository.GetByUidAsync(userId, CancellationToken.None);

        return user.Name;
    }

    public async Task<bool> IsInRoleAsync(string userId, string role)
    {
        //var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        //return user != null && await _userManager.IsInRoleAsync(user, role);

        return false; //TODO: Implement
    }

    public async Task<bool> AuthorizeAsync(string userId, string policyName)
    {
        //var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        //if (user == null)
        //{
        //    return false;
        //}

        //var principal = await _userClaimsPrincipalFactory.CreateAsync(user);

        //var result = await _authorizationService.AuthorizeAsync(principal, policyName);

        //return result.Succeeded;

        return false; //TODO: Implement
    }
}
