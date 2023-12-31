﻿using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application.Prescriptions.Commands.UpdateManufacturer;
public class UpdateManufacturerCommandHandler : IRequestHandler<UpdateManufacturerCommand>
{
    private readonly ICoreDbContext _context;
    private readonly IBaseRepository<Manufacturer> _manufacturerRepository;
    private readonly IValidator<UpdateManufacturerCommand> _validator;

    public UpdateManufacturerCommandHandler
    (
        ICoreDbContext context,
        IBaseRepository<Manufacturer> manufacturerRepository,
        IValidator<UpdateManufacturerCommand> validator
    )
    {
        _context = context;
        _manufacturerRepository = manufacturerRepository;
        _validator = validator;
    }

    public async Task Handle(UpdateManufacturerCommand request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request);
        result.ThrowIfNotValid();

        var manufacturer = await _manufacturerRepository.StartQuery()
            .Include(x => x.VeterinaryClinic)
            .Where(x => x.Uid == request.ManufacturerUid)
            .SingleOrDefaultAsync(cancellationToken);

        if (manufacturer is null)
        {
            throw new NotFoundException();
        }

        await _manufacturerRepository.ThrowIfConflict(x =>
            x.Name.ToLower() == request.Name.ToLower() && x.VeterinaryClinic == manufacturer.VeterinaryClinic,
            cancellationToken);

        manufacturer.Address = request.Address;
        manufacturer.BankAccount = request.BankAccount;
        manufacturer.City = request.City;
        manufacturer.ContactPerson = request.ContactPerson;
        manufacturer.MobileNumber = request.MobileNumber;
        manufacturer.Name = string.IsNullOrEmpty(request.Name) ? manufacturer.Name : request.Name;
        manufacturer.PhoneNumber = request.PhoneNumber;
        _manufacturerRepository.Update(manufacturer);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
