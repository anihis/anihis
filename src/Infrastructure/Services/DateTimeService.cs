using anihis.Application.Common.Interfaces;

namespace anihis.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
