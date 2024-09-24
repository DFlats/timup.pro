using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class CollaboratorKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Collaborator_Users_UserClerkId",
                table: "Collaborator");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Collaborator",
                table: "Collaborator");

            migrationBuilder.DropIndex(
                name: "IX_Collaborator_UserClerkId",
                table: "Collaborator");

            migrationBuilder.DropColumn(
                name: "UserClerkId",
                table: "Collaborator");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Collaborator",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Collaborator",
                table: "Collaborator",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Collaborator_UserId",
                table: "Collaborator",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Collaborator_Users_UserId",
                table: "Collaborator",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "ClerkId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Collaborator_Users_UserId",
                table: "Collaborator");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Collaborator",
                table: "Collaborator");

            migrationBuilder.DropIndex(
                name: "IX_Collaborator_UserId",
                table: "Collaborator");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Collaborator");

            migrationBuilder.AddColumn<string>(
                name: "UserClerkId",
                table: "Collaborator",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Collaborator",
                table: "Collaborator",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Collaborator_UserClerkId",
                table: "Collaborator",
                column: "UserClerkId");

            migrationBuilder.AddForeignKey(
                name: "FK_Collaborator_Users_UserClerkId",
                table: "Collaborator",
                column: "UserClerkId",
                principalTable: "Users",
                principalColumn: "ClerkId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
