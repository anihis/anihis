﻿using MediatR;

namespace anihis.Application.Animals.Queries.GetSingle;
public class GetAnimalQuery : IRequest<GetAnimalResult>
{
    public string AnimalUid { get; set; }
}
