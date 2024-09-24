using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class projectAcceptedAndUserAcceptedBools : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Accepted",
                table: "ProjectInvites",
                newName: "UserAccepted");

            migrationBuilder.AddColumn<bool>(
                name: "ProjectAccepted",
                table: "ProjectInvites",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectAccepted",
                table: "ProjectInvites");

            migrationBuilder.RenameColumn(
                name: "UserAccepted",
                table: "ProjectInvites",
                newName: "Accepted");
        }
    }
}
