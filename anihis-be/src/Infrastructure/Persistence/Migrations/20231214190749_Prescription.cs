using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace anihis.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Prescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    Uid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Manufacturers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Prescriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    AlternateName = table.Column<string>(type: "TEXT", nullable: true),
                    SerialNumber = table.Column<string>(type: "TEXT", nullable: false),
                    PrescriptionType = table.Column<string>(type: "TEXT", nullable: false),
                    JM = table.Column<string>(type: "TEXT", nullable: true),
                    MainPrice = table.Column<string>(type: "TEXT", nullable: false),
                    SecondPrice = table.Column<string>(type: "TEXT", nullable: true),
                    ManufacturerId = table.Column<int>(type: "INTEGER", nullable: false),
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
                });

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_ManufacturerId",
                table: "Prescriptions",
                column: "ManufacturerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Prescriptions");

            migrationBuilder.DropTable(
                name: "Manufacturers");
        }
    }
}
