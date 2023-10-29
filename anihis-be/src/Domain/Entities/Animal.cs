namespace anihis.Domain.Entities;
public class Animal : BaseEntity
{
    public string? PersonalNumber { get; set; }
    public string Name { get; set; }
    public Species Species { get; set; }
    public Breed? Breed { get; set; }
    public Gender Gender { get; set; }
    public DateTime? BirthDateTime { get; set; }
    public string? PassportNumber { get; set; }
    public Owner Owner { get; set; }
    public DateTime? DeleteDateTimeUtc { get; set; }
    public DateTime? LastModifiedDateTimeUtc { get; set; }
    public string? Warning { get; set; }
}
