using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace anihis.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class LastModifiedDateTimeUtcColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedDateTimeUtc",
                table: "Owners",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedDateTimeUtc",
                table: "HealthRecords",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedDateTimeUtc",
                table: "Animals",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastModifiedDateTimeUtc",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "LastModifiedDateTimeUtc",
                table: "HealthRecords");

            migrationBuilder.DropColumn(
                name: "LastModifiedDateTimeUtc",
                table: "Animals");
        }
    }
}
