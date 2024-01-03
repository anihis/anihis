using System.Linq.Expressions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Common;
using FluentValidation.Results;

namespace anihis.Application;
public static class ValidationExtensions
{
    public static void ThrowIfNotValid(this ValidationResult result)
    {
        if (!result.IsValid)
        {
            throw new Common.Exceptions.ValidationException(result.Errors);
        }
    }

    public static async Task ThrowIfConflict<T>
    (
        this IBaseRepository<T> repository,
        Expression<Func<T, bool>> condition,
        CancellationToken cancellationToken
    )
        where T : BaseEntity
    {
        var values = await repository.FindByConditionAync(condition, cancellationToken);
        var value = values.SingleOrDefault();

        if (value != null)
        {
            var validationFailure = new ValidationFailure
            {
                ErrorMessage = $"A entity with the same name already exists.",
                PropertyName = "Name"
            };

            throw new Common.Exceptions.ValidationException(validationFailure);
        }
    }
}
