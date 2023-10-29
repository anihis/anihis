﻿namespace anihis.Domain.Entities;
public class Veterinarian : BaseEntity
{
    public string LicenceNumber { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? MobileNumber { get; set; }
    public VeterinaryClinic VeterinaryClinic { get; set; }
}