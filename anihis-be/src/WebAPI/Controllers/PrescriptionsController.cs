﻿using anihis.Application.Common.Interfaces;
using anihis.Application.Prescriptions.Commands.Create;
using anihis.Application.Prescriptions.Commands.CreateManufacturer;
using anihis.Application.Prescriptions.Commands.Delete;
using anihis.Application.Prescriptions.Commands.DeleteManufacturer;
using anihis.Application.Prescriptions.Commands.Update;
using anihis.Application.Prescriptions.Commands.UpdateManufacturer;
using anihis.Application.Prescriptions.Queries.Get;
using anihis.Application.Prescriptions.Queries.GetManufacturers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace anihis.WebAPI.Controllers;

public class PrescriptionsController : ApiControllerBase
{
    public PrescriptionsController
    (
        IMediator mediator,
        ICurrentUserService currentUserService
    )
        : base(mediator, currentUserService)
    {
    }

    [HttpGet]
    public async Task<ActionResult<GetPrescriptionsResult>> GetPrescriptions()
    {
        return await Mediator.Send(new GetPrescriptionsQuery());
    }

    [HttpGet("manufacturers")]
    public async Task<ActionResult<GetManufacturersResult>> GetManufacturers()
    {
        return await Mediator.Send(new GetManufacturersQuery());
    }

    [HttpPost]
    public async Task CreatePrescription(CreatePrescriptionCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPost("manufacturers")]
    public async Task CreateManufacturer(CreateManufacturerCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPut("{uid}")]
    public async Task UpdatePrescription(string uid, UpdatePrescriptionCommand command)
    {
        command.PrescriptionUid = uid;
        await Mediator.Send(command);
    }

    [HttpPut("manufacturers/{uid}")]
    public async Task UpdateManufacturer(string uid, UpdateManufacturerCommand command)
    {
        command.ManufacturerUid = uid;
        await Mediator.Send(command);
    }

    [HttpDelete("{uid}")]
    public async Task DeletePrescription(string uid)
    {
        await Mediator.Send(new DeletePrescriptionCommand { PrescriptionUid = uid });
    }

    [HttpDelete("manufacturers/{uid}")]
    public async Task DeleteManufacturer(string uid)
    {
        await Mediator.Send(new DeleteManufacturerCommand { ManufacturerUid = uid });
    }
}
