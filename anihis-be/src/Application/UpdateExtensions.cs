using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Common;
using anihis.Domain.Entities;
using FluentValidation.Results;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace anihis.Application;
public static class UpdateExtensions
{
    //public static async Task<T> UpdateEntity<T>
    //(
    //    this IBaseRepository<T> repository,
    //    string uid,
    //    string name,
    //    CancellationToken cancellationToken
    //)
    //    where T : Diagnosis, Manufacturer, Prescription, Service
    //{
    //    var entity = await repository.StartQuery()
    //        .Include(x => x.VeterinaryClinic)
    //        .Where(x => x.Uid == uid)
    //        .SingleOrDefaultAsync(cancellationToken);

    //    if (entity is null)
    //    {
    //        throw new NotFoundException();
    //    }

    //    await repository.ThrowIfConflict(x =>
    //        x.Name.ToLower() == name.ToLower() && x.VeterinaryClinic == entity.VeterinaryClinic,
    //        cancellationToken);

    //    return entity;
    //}
}
