namespace anihis.Domain.Entities;
public class HealthRecordService : BaseEntity
{
    public HealthRecord HealthRecord { get; set; }
    public Service Service { get; set; }
    public string? ServiceQuantity { get; set; }
    public string? ServicePrice { get; set; }
    public string? ServiceVAT { get; set; }
    public string? ServiceTotal { get; set; }
}
