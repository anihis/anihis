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
                    DeleteDateTimeUtc = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Warning = table.Column<string>(type: "TEXT", nullable: true),
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
                name: "Animals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PersonalNumber = table.Column<string>(type: "TEXT", nullable: true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    SpeciesId = table.Column<int>(type: "INTEGER", nullable: false),
                    BreedId = table.Column<int>(type: "INTEGER", nullable: true),
                    Gender = table.Column<int>(type: "INTEGER", nullable: false),
                    BirthDateTime = table.Column<DateTime>(type: "TEXT", nullable: true),
                    PassportNumber = table.Column<string>(type: "TEXT", nullable: true),
                    OwnerId = table.Column<int>(type: "INTEGER", nullable: false),
                    DeleteDateTimeUtc = table.Column<DateTime>(type: "TEXT", nullable: true),
                    LastModifiedDateTimeUtc = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Warning = table.Column<string>(type: "TEXT", nullable: true),
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
                        name: "FK_Animals_Species_SpeciesId",
                        column: x => x.SpeciesId,
                        principalTable: "Species",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    Value = table.Column<string>(type: "TEXT", nullable: false),
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
                    Report = table.Column<string>(type: "TEXT", nullable: true),
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
                    OwnerId = table.Column<int>(type: "INTEGER", nullable: false),
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
                        name: "FK_Vaccinations_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Vaccinations_Users_VeterinarianId",
                        column: x => x.VeterinarianId,
                        principalTable: "Users",
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
                name: "IX_Animals_SpeciesId",
                table: "Animals",
                column: "SpeciesId");

            migrationBuilder.CreateIndex(
                name: "IX_Breeds_SpeciesId",
                table: "Breeds",
                column: "SpeciesId");

            migrationBuilder.CreateIndex(
                name: "IX_HealthRecords_AnimalId",
                table: "HealthRecords",
                column: "AnimalId");

            migrationBuilder.CreateIndex(
                name: "IX_HealthRecords_VeterinarianId",
                table: "HealthRecords",
                column: "VeterinarianId");

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
                name: "IX_Users_VeterinaryClinicId",
                table: "Users",
                column: "VeterinaryClinicId");

            migrationBuilder.CreateIndex(
                name: "IX_Vaccinations_AnimalId",
                table: "Vaccinations",
                column: "AnimalId");

            migrationBuilder.CreateIndex(
                name: "IX_Vaccinations_OwnerId",
                table: "Vaccinations",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Vaccinations_VeterinarianId",
                table: "Vaccinations",
                column: "VeterinarianId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HealthRecords");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Vaccinations");

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
