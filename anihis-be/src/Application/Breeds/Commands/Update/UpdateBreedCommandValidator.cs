﻿using FluentValidation;

namespace anihis.Application.Breeds.Commands.Update;
public class UpdateBreedCommandValidator : AbstractValidator<UpdateBreedCommand>
{
    public UpdateBreedCommandValidator()
    {
        RuleFor(x => x.BreedUid)
            .NotEmpty()
            .WithMessage("Uid is required.");

        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("The name cannot be null or empty.");
    }
}
