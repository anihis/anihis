using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace anihis.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Payment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                        name: "FK_Payments_Owners_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Owners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Payments_Veterinarians_VeterinarianId",
                        column: x => x.VeterinarianId,
                        principalTable: "Veterinarians",
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
                        name: "FK_Vaccinations_Owners_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Owners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Vaccinations_Veterinarians_VeterinarianId",
                        column: x => x.VeterinarianId,
                        principalTable: "Veterinarians",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Vaccinations");
        }
    }
}
