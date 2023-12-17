using MediatR;

namespace anihis.Application.Manufacturers.Queries.GetSingle;
public class GetManufacturerQuery : IRequest<GetManufacturerResult>
{
    public string ManufacturerUid { get; set; }
}
