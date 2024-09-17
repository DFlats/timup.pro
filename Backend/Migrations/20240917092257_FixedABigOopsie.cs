using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class FixedABigOopsie : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Description_DescriptionId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Tag_TagId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_User_AuthorId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Tag_Description_DescriptionId",
                table: "Tag");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Projects_ProjectId",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tag",
                table: "Tag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Description",
                table: "Description");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "Tag",
                newName: "Tags");

            migrationBuilder.RenameTable(
                name: "Description",
                newName: "Descriptions");

            migrationBuilder.RenameIndex(
                name: "IX_User_ProjectId",
                table: "Users",
                newName: "IX_Users_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Tag_DescriptionId",
                table: "Tags",
                newName: "IX_Tags_DescriptionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "ClerkId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tags",
                table: "Tags",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Descriptions",
                table: "Descriptions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Descriptions_DescriptionId",
                table: "Projects",
                column: "DescriptionId",
                principalTable: "Descriptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Tags_TagId",
                table: "Projects",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Users_AuthorId",
                table: "Projects",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "ClerkId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_Descriptions_DescriptionId",
                table: "Tags",
                column: "DescriptionId",
                principalTable: "Descriptions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Projects_ProjectId",
                table: "Users",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Descriptions_DescriptionId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Tags_TagId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Users_AuthorId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Tags_Descriptions_DescriptionId",
                table: "Tags");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Projects_ProjectId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tags",
                table: "Tags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Descriptions",
                table: "Descriptions");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.RenameTable(
                name: "Tags",
                newName: "Tag");

            migrationBuilder.RenameTable(
                name: "Descriptions",
                newName: "Description");

            migrationBuilder.RenameIndex(
                name: "IX_Users_ProjectId",
                table: "User",
                newName: "IX_User_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Tags_DescriptionId",
                table: "Tag",
                newName: "IX_Tag_DescriptionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "ClerkId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tag",
                table: "Tag",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Description",
                table: "Description",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Description_DescriptionId",
                table: "Projects",
                column: "DescriptionId",
                principalTable: "Description",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Tag_TagId",
                table: "Projects",
                column: "TagId",
                principalTable: "Tag",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_User_AuthorId",
                table: "Projects",
                column: "AuthorId",
                principalTable: "User",
                principalColumn: "ClerkId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tag_Description_DescriptionId",
                table: "Tag",
                column: "DescriptionId",
                principalTable: "Description",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Projects_ProjectId",
                table: "User",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }
    }
}
