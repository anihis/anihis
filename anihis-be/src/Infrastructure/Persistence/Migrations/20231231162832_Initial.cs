using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace anihis.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Species",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Species", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VeterinaryClinics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VeterinaryClinics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Breeds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    SpeciesId = table.Column<int>(type: "INTEGER", nullable: false),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Breeds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Breeds_Species_SpeciesId",
                        column: x => x.SpeciesId,
                        principalTable: "Species",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Diagnoses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    VeterinaryClinicId = table.Column<int>(type: "INTEGER", nullable: false),
                    DiagnosisType = table.Column<int>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Code = table.Column<int>(type: "INTEGER", nullable: false),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Diagnoses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Diagnoses_VeterinaryClinics_VeterinaryClinicId",
                        column: x => x.VeterinaryClinicId,
                        principalTable: "VeterinaryClinics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Manufacturers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    City = table.Column<string>(type: "TEXT", nullable: true),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    MobileNumber = table.Column<string>(type: "TEXT", nullable: true),
                    BankAccount = table.Column<string>(type: "TEXT", nullable: true),
                    ContactPerson = table.Column<string>(type: "TEXT", nullable: true),
                    VeterinaryClinicId = table.Column<int>(type: "INTEGER", nullable: false),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Manufacturers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Manufacturers_VeterinaryClinics_VeterinaryClinicId",
                        column: x => x.VeterinaryClinicId,
                        principalTable: "VeterinaryClinics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    VeterinaryClinicId = table.Column<int>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Code = table.Column<int>(type: "INTEGER", nullable: false),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Services_VeterinaryClinics_VeterinaryClinicId",
                        column: x => x.VeterinaryClinicId,
                        principalTable: "VeterinaryClinics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    MobileNumber = table.Column<string>(type: "TEXT", nullable: true),
                    Discriminator = table.Column<string>(type: "TEXT", nullable: false),
                    City = table.Column<string>(type: "TEXT", nullable: true),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    PostalCode = table.Column<string>(type: "TEXT", nullable: true),
                    Country = table.Column<string>(type: "TEXT", nullable: true),
                    PersonalNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PassportNumber = table.Column<string>(type: "TEXT", nullable: true),
                    IdCardNumber = table.Column<string>(type: "TEXT", nullable: true),
                    LastModifiedDateTimeUtc = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Warning = table.Column<string>(type: "TEXT", nullable: true),
                    UnpaidExpenses = table.Column<int>(type: "INTEGER", nullable: true),
                    LicenceNumber = table.Column<string>(type: "TEXT", nullable: true),
                    VeterinaryClinicId = table.Column<int>(type: "INTEGER", nullable: true),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_VeterinaryClinics_VeterinaryClinicId",
                        column: x => x.VeterinaryClinicId,
                        principalTable: "VeterinaryClinics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Prescriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    AlternateName = table.Column<string>(type: "TEXT", nullable: true),
                    Code = table.Column<int>(type: "INTEGER", nullable: false),
                    PrescriptionType = table.Column<string>(type: "TEXT", nullable: false),
                    JM = table.Column<string>(type: "TEXT", nullable: true),
                    MainPrice = table.Column<string>(type: "TEXT", nullable: false),
                    SecondPrice = table.Column<string>(type: "TEXT", nullable: true),
                    ManufacturerId = table.Column<int>(type: "INTEGER", nullable: false),
                    VeterinaryClinicId = table.Column<int>(type: "INTEGER", nullable: false),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prescriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Prescriptions_Manufacturers_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Prescriptions_VeterinaryClinics_VeterinaryClinicId",
                        column: x => x.VeterinaryClinicId,
                        principalTable: "VeterinaryClinics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Animals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PersonalNumber = table.Column<string>(type: "TEXT", nullable: true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    BreedId = table.Column<int>(type: "INTEGER", nullable: true),
                    Gender = table.Column<int>(type: "INTEGER", nullable: false),
                    Color = table.Column<string>(type: "TEXT", nullable: false),
                    BirthDateTime = table.Column<DateTime>(type: "TEXT", nullable: true),
                    PassportNumber = table.Column<string>(type: "TEXT", nullable: true),
                    VIIssuesAPassport = table.Column<string>(type: "TEXT", nullable: true),
                    OwnerId = table.Column<int>(type: "INTEGER", nullable: false),
                    Warning = table.Column<string>(type: "TEXT", nullable: true),
                    Identification = table.Column<string>(type: "TEXT", nullable: true),
                    MarkingDateTimeUtc = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Pedigree = table.Column<string>(type: "TEXT", nullable: true),
                    Sterilized = table.Column<bool>(type: "INTEGER", nullable: true),
                    SterilizedDateTimeUtc = table.Column<DateTime>(type: "TEXT", nullable: true),
                    LastModifiedDateTimeUtc = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Animals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Animals_Breeds_BreedId",
                        column: x => x.BreedId,
                        principalTable: "Breeds",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Animals_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OwnerId = table.Column<int>(type: "INTEGER", nullable: false),
                    VeterinarianId = table.Column<int>(type: "INTEGER", nullable: false),
                    VeterinaryClinicId = table.Column<int>(type: "INTEGER", nullable: false),
                    PaymentDateTimeUtc = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Value = table.Column<int>(type: "INTEGER", nullable: false),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payments_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Payments_Users_VeterinarianId",
                        column: x => x.VeterinarianId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Payments_VeterinaryClinics_VeterinaryClinicId",
                        column: x => x.VeterinaryClinicId,
                        principalTable: "VeterinaryClinics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HealthRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AnimalId = table.Column<int>(type: "INTEGER", nullable: false),
                    VeterinarianId = table.Column<int>(type: "INTEGER", nullable: false),
                    CreateDateTimeUtc = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Control = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Temperature = table.Column<string>(type: "TEXT", nullable: true),
                    Weight = table.Column<string>(type: "TEXT", nullable: true),
                    Anamnesis = table.Column<string>(type: "TEXT", nullable: false),
                    ClinicalExamination = table.Column<string>(type: "TEXT", nullable: false),
                    Recommendation = table.Column<string>(type: "TEXT", nullable: true),
                    OtherFindings = table.Column<string>(type: "TEXT", nullable: true),
                    Note = table.Column<string>(type: "TEXT", nullable: true),
                    Therapy = table.Column<string>(type: "TEXT", nullable: true),
                    LastModifiedDateTimeUtc = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HealthRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HealthRecords_Animals_AnimalId",
                        column: x => x.AnimalId,
                        principalTable: "Animals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HealthRecords_Users_VeterinarianId",
                        column: x => x.VeterinarianId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vaccinations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    VeterinarianId = table.Column<int>(type: "INTEGER", nullable: false),
                    AnimalId = table.Column<int>(type: "INTEGER", nullable: false),
                    VaccineName = table.Column<string>(type: "TEXT", nullable: false),
                    VaccineSerialNumber = table.Column<string>(type: "TEXT", nullable: false),
                    VaccinationDateTimeUtc = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Price = table.Column<string>(type: "TEXT", nullable: false),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vaccinations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vaccinations_Animals_AnimalId",
                        column: x => x.AnimalId,
                        principalTable: "Animals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Vaccinations_Users_VeterinarianId",
                        column: x => x.VeterinarianId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HealthRecordDiagnoses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    HealthRecordId = table.Column<int>(type: "INTEGER", nullable: false),
                    DiagnosisId = table.Column<int>(type: "INTEGER", nullable: false),
                    DiagnosisNote = table.Column<string>(type: "TEXT", nullable: true),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HealthRecordDiagnoses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HealthRecordDiagnoses_Diagnoses_DiagnosisId",
                        column: x => x.DiagnosisId,
                        principalTable: "Diagnoses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HealthRecordDiagnoses_HealthRecords_HealthRecordId",
                        column: x => x.HealthRecordId,
                        principalTable: "HealthRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HealthRecordPrescriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    HealthRecordId = table.Column<int>(type: "INTEGER", nullable: false),
                    PrescriptionId = table.Column<int>(type: "INTEGER", nullable: false),
                    PrescriptionNote = table.Column<string>(type: "TEXT", nullable: true),
                    PrescriptionQuantity = table.Column<string>(type: "TEXT", nullable: true),
                    PrescriptionPrice = table.Column<string>(type: "TEXT", nullable: true),
                    PrescriptionVAT = table.Column<string>(type: "TEXT", nullable: true),
                    PrescriptionTotal = table.Column<string>(type: "TEXT", nullable: true),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HealthRecordPrescriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HealthRecordPrescriptions_HealthRecords_HealthRecordId",
                        column: x => x.HealthRecordId,
                        principalTable: "HealthRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HealthRecordPrescriptions_Prescriptions_PrescriptionId",
                        column: x => x.PrescriptionId,
                        principalTable: "Prescriptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HealthRecordServices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    HealthRecordId = table.Column<int>(type: "INTEGER", nullable: false),
                    ServiceId = table.Column<int>(type: "INTEGER", nullable: false),
                    ServiceQuantity = table.Column<string>(type: "TEXT", nullable: true),
                    ServicePrice = table.Column<string>(type: "TEXT", nullable: true),
                    ServiceVAT = table.Column<string>(type: "TEXT", nullable: true),
                    ServiceTotal = table.Column<string>(type: "TEXT", nullable: true),
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HealthRecordServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HealthRecordServices_HealthRecords_HealthRecordId",
                        column: x => x.HealthRecordId,
                        principalTable: "HealthRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HealthRecordServices_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Animals_BreedId",
                table: "Animals",
                column: "BreedId");

            migrationBuilder.CreateIndex(
                name: "IX_Animals_OwnerId",
                table: "Animals",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Breeds_SpeciesId",
                table: "Breeds",
                column: "SpeciesId");

            migrationBuilder.CreateIndex(
                name: "IX_Diagnoses_VeterinaryClinicId",
                table: "Diagnoses",
                column: "VeterinaryClinicId");

            migrationBuilder.CreateIndex(
                name: "IX_HealthRecordDiagnoses_DiagnosisId",
                table: "HealthRecordDiagnoses",
                column: "DiagnosisId");

            migrationBuilder.CreateIndex(
                name: "IX_HealthRecordDiagnoses_HealthRecordId",
                table: "HealthRecordDiagnoses",
                column: "HealthRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_HealthRecordPrescriptions_HealthRecordId",
                table: "HealthRecordPrescriptions",
                column: "HealthRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_HealthRecordPrescriptions_PrescriptionId",
                table: "HealthRecordPrescriptions",
                column: "PrescriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_HealthRecords_AnimalId",
                table: "HealthRecords",
                column: "AnimalId");

            migrationBuilder.CreateIndex(
                name: "IX_HealthRecords_VeterinarianId",
                table: "HealthRecords",
                column: "VeterinarianId");

            migrationBuilder.CreateIndex(
                name: "IX_HealthRecordServices_HealthRecordId",
                table: "HealthRecordServices",
                column: "HealthRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_HealthRecordServices_ServiceId",
                table: "HealthRecordServices",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Manufacturers_VeterinaryClinicId",
                table: "Manufacturers",
                column: "VeterinaryClinicId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_OwnerId",
                table: "Payments",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_VeterinarianId",
                table: "Payments",
                column: "VeterinarianId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_VeterinaryClinicId",
                table: "Payments",
                column: "VeterinaryClinicId");

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_ManufacturerId",
                table: "Prescriptions",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_VeterinaryClinicId",
                table: "Prescriptions",
                column: "VeterinaryClinicId");

            migrationBuilder.CreateIndex(
                name: "IX_Services_VeterinaryClinicId",
                table: "Services",
                column: "VeterinaryClinicId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_VeterinaryClinicId",
                table: "Users",
                column: "VeterinaryClinicId");

            migrationBuilder.CreateIndex(
                name: "IX_Vaccinations_AnimalId",
                table: "Vaccinations",
                column: "AnimalId");

            migrationBuilder.CreateIndex(
                name: "IX_Vaccinations_VeterinarianId",
                table: "Vaccinations",
                column: "VeterinarianId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HealthRecordDiagnoses");

            migrationBuilder.DropTable(
                name: "HealthRecordPrescriptions");

            migrationBuilder.DropTable(
                name: "HealthRecordServices");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Vaccinations");

            migrationBuilder.DropTable(
                name: "Diagnoses");

            migrationBuilder.DropTable(
                name: "Prescriptions");

            migrationBuilder.DropTable(
                name: "HealthRecords");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "Manufacturers");

            migrationBuilder.DropTable(
                name: "Animals");

            migrationBuilder.DropTable(
                name: "Breeds");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Species");

            migrationBuilder.DropTable(
                name: "VeterinaryClinics");
        }
    }
}
