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
}
