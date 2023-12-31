﻿using anihis.Application.Common.Mappings;
using anihis.Domain.Entities;
using anihis.Domain.Enums;

namespace anihis.Application.Animals.Queries.Get;
public class GetAnimalsResult : IMapFrom<Animal>
{
    public string AnimalUid { get; set; }
    public string? PersonalNumber { get; set; }
    public string Name { get; set; }
    public string? Species { get; set; }
    public string? Breed { get; set; }
    public Gender Gender { get; set; }
    public Common.Models.Owner Owner { get; set; }
    public string? Warning { get; set; }
}
