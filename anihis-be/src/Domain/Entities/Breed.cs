﻿namespace anihis.Domain.Entities;
public class Breed : BaseEntity
{
    public string Name { get; set; }
    public Species Species { get; set; }
}
