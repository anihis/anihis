﻿using FluentValidation;

namespace anihis.Application.Species.Commands.UpdateBreed;
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