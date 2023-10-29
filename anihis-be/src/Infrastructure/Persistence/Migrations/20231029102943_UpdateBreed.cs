using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace anihis.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBreed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SpeciesId",
                table: "Breeds",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Breeds_SpeciesId",
                table: "Breeds",
                column: "SpeciesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Breeds_Species_SpeciesId",
                table: "Breeds",
                column: "SpeciesId",
                principalTable: "Species",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Breeds_Species_SpeciesId",
                table: "Breeds");

            migrationBuilder.DropIndex(
                name: "IX_Breeds_SpeciesId",
                table: "Breeds");

            migrationBuilder.DropColumn(
                name: "SpeciesId",
                table: "Breeds");
        }
    }
}
