﻿namespace anihis.Domain.Entities;
public class Veterinarian : User
{
    public string LicenceNumber { get; set; }
    //public string FirstName { get; set; }
    //public string LastName { get; set; }
    //public string? Email { get; set; }
    //public string? PhoneNumber { get; set; }
    //public string? MobileNumber { get; set; }
    public VeterinaryClinic VeterinaryClinic { get; set; }
    //public User User { get; set; }
}
