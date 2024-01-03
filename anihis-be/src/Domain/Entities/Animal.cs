namespace anihis.Domain.Entities;
public class Animal : BaseEntity
{
    public string? PersonalNumber { get; set; }
    public string Name { get; set; }
    public Breed? Breed { get; set; }
    public Gender Gender { get; set; }
    public string Color { get; set; }
    public DateTime? BirthDateTime { get; set; }
    public string? PassportNumber { get; set; }
    public string? VIIssuesAPassport { get; set; }
    public Owner Owner { get; set; }
    public string? Warning { get; set; }
    public string? Identification { get; set; }
    public DateTime? MarkingDateTimeUtc { get; set; }
    public string? Pedigree { get; set; }
    public bool? Sterilized { get; set; }
    public DateTime? SterilizedDateTimeUtc { get; set; }
    public DateTime? LastModifiedDateTimeUtc { get; set; }
}
