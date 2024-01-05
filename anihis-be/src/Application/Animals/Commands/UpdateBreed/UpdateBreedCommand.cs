﻿using MediatR;

namespace anihis.Application.Animals.Commands.UpdateBreed;
public class UpdateBreedCommand : IRequest
{
    public string BreedUid { get; set; }
    public string Name { get; set; }


    //public List<Breed> Breeds { get; set; }
    //public string SpeciesUid { get; set; }
}
