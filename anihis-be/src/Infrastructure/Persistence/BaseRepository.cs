using System.Linq.Expressions;
using anihis.Application.Common.Exceptions;
using anihis.Application.Common.Interfaces;
using anihis.Domain.Common;
using Microsoft.EntityFrameworkCore;

namespace anihis.Infrastructure.Persistence;

public class BaseRepository<TDbContextType, TEntity> : IBaseRepository<TEntity>
    where TDbContextType : ICoreDbContext
    where TEntity : BaseEntity
{
    public readonly DbContext DbContext;
    protected readonly DbSet<TEntity> DbSet;

    public BaseRepository(TDbContextType dbContext)
    {
        DbContext = dbContext as DbContext;
        if (DbContext == null)
        {
            throw new ArgumentException("Not and instance of DbContext", nameof(dbContext));
        }
        DbSet = DbContext.Set<TEntity>();
    }

    public virtual IQueryable<TEntity> GetQuery()
    {
        return DbContext.Set<TEntity>();
    }

    public void Insert(TEntity entity)
    {
        DbContext.Set<TEntity>().Add(entity);
    }

    public void Delete(TEntity entity)
    {
        DbContext.Set<TEntity>().Remove(entity);
    }

    public async Task<IEnumerable<TEntity>> FindByConditionAync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken)
    {
        return await GetQuery().Where(predicate).ToArrayAsync(cancellationToken);
    }

    public async Task<TEntity> GetByUidAsync(string uid, CancellationToken cancellationToken)
    {
        return await GetQuery().Where(x => x.Uid == uid).SingleOrDefaultAsync(cancellationToken);
    }

    public async Task<TEntity> GetByUidOrThrowAsync(string uid, CancellationToken cancellationToken)
    {
        var entity = await GetByUidAsync(uid, cancellationToken);
        if (entity == null)
        {
            throw new NotFoundException(typeof(TEntity).Name, uid);
        }

        return entity;
    }

    public void Update(TEntity entity)
    {
        DbContext.Entry(entity).State = EntityState.Modified;
    }
}
