﻿using MediatR;

namespace anihis.Application.Veterinarians.Commands.Create;
public class CreateVeterinarianCommand : IRequest
{
    public string LicenceNumber { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? MobileNumber { get; set; }
    public string VeterinaryClinicUid { get; set; }
    public string UserUid { get; set; }
}
