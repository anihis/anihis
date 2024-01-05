using anihis.Application.Common.Interfaces;
using anihis.Application.HealthRecords.Commands.Create;
using anihis.Application.HealthRecords.Commands.CreateDiagnosis;
using anihis.Application.HealthRecords.Commands.CreateService;
using anihis.Application.HealthRecords.Commands.DeleteDiagnosis;
using anihis.Application.HealthRecords.Commands.DeleteService;
using anihis.Application.HealthRecords.Commands.Update;
using anihis.Application.HealthRecords.Commands.UpdateDiagnosis;
using anihis.Application.HealthRecords.Commands.UpdateService;
using anihis.Application.HealthRecords.Queries.GetDiagnoses;
using anihis.Application.HealthRecords.Queries.GetHealthRecord;
using anihis.Application.HealthRecords.Queries.GetHealthRecords;
using anihis.Application.HealthRecords.Queries.GetServices;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace anihis.WebAPI.Controllers;

public class HealthRecordsController : ApiControllerBase
{
    public HealthRecordsController
    (
        IMediator mediator,
        ICurrentUserService currentUserService
    )
        : base(mediator, currentUserService)
    {
    }

    [HttpGet("{uid}")]
    public async Task<ActionResult<GetHealthRecordsResult>> GetHealthRecords(string uid)
    {
        return await Mediator.Send(new GetHealthRecordsQuery { AnimalUid = uid });
    }

    [HttpGet("Diagnosis")]
    public async Task<ActionResult<GetDiagnosesResult>> GetDiagnoses()
    {
        return await Mediator.Send(new GetDiagnosesQuery());
    }

    [HttpGet("Service")]
    public async Task<ActionResult<GetServicesResult>> GetServices()
    {
        return await Mediator.Send(new GetServicesQuery());
    }

    [HttpGet("Single/{uid}")]
    public async Task<ActionResult<GetHealthRecordResult>> GetHealthRecord(string uid)
    {
        return await Mediator.Send(new GetHealthRecordQuery { HealthRecordUid = uid });
    }

    [HttpPost]
    public async Task CreateHealthRecord(CreateHealthRecordCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPost("Diagnosis")]
    public async Task CreateDiagnosis(CreateDiagnosisCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPost("Service")]
    public async Task CreateService(CreateServiceCommand command)
    {
        await Mediator.Send(command);
    }

    [HttpPut("{uid}")]
    public async Task UpdateHealthRecord(string uid, UpdateHealthRecordCommand command)
    {
        //command.PrescriptionUid = uid;
        await Mediator.Send(command);
    }

    [HttpPut("Diagnosis/{uid}")]
    public async Task UpdateDiagnosis(string uid, UpdateDiagnosisCommand command)
    {
        command.DiagnosisUid = uid;
        await Mediator.Send(command);
    }

    [HttpPut("Service/{uid}")]
    public async Task UpdateService(string uid, UpdateServiceCommand command)
    {
        command.ServiceUid = uid;
        await Mediator.Send(command);
    }

    [HttpDelete("Diagnosis/{uid}")]
    public async Task DeleteDiagnosis(string uid)
    {
        await Mediator.Send(new DeleteDiagnosisCommand { DiagnosisUid = uid });
    }

    [HttpDelete("Service/{uid}")]
    public async Task DeleteService(string uid)
    {
        await Mediator.Send(new DeleteServiceCommand { ServiceUid = uid });
    }
}
