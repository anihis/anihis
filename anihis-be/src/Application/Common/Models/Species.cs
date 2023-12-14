namespace anihis.Application.Common.Models;
public class Species
{
    public string Uid { get; set; }
    public string Name { get; set; }
    public List<Breed>? Breeds { get; set; }
}
