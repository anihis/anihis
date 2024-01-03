using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using anihis.Application.HealthRecords.Models;

namespace anihis.Application.HealthRecords.Queries.GetHealthRecord;
public class GetHealthRecordResult
{
    public string AnimalUid { get; set; }
    public DateTime? Control { get; set; }
    public string? Temperature { get; set; }
    public string? Weight { get; set; }
    public string Anamnesis { get; set; }
    public string ClinicalExamination { get; set; }
    public string? Recommendation { get; set; }
    public string? OtherFindings { get; set; }
    public string? Note { get; set; }
    public string? Therapy { get; set; }
    public List<SelectedDiagnosis> Diagnoses { get; set; }
    public List<SelectedService> Services { get; set; }
    public List<SelectedPrescription> Prescriptions { get; set; }
}
