using System.Linq.Expressions;
using anihis.Domain.Common;

namespace anihis.Application.Common.Interfaces;

public interface IBaseRepository<TEntity> where TEntity : BaseEntity
{
    Task<IEnumerable<TEntity>> FindByConditionAync(Expression<Func<TEntity, bool>> expression, CancellationToken cancellationToken);
    Task<TEntity> GetByUidAsync(string uid, CancellationToken cancellationToken);
    void Insert(TEntity entity);
    void Update(TEntity entity);
    void Delete(TEntity entity);
    IQueryable<TEntity> StartQuery();
    Task<TEntity> GetByUidOrThrowAsync(string uid, CancellationToken cancellationToken);
}
