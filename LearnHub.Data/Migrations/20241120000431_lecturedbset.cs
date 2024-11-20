using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearnHub.Data.Migrations
{
    /// <inheritdoc />
    public partial class lecturedbset : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lecture_Modules_ModuleId",
                table: "Lecture");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lecture",
                table: "Lecture");

            migrationBuilder.RenameTable(
                name: "Lecture",
                newName: "Lectures");

            migrationBuilder.RenameIndex(
                name: "IX_Lecture_ModuleId",
                table: "Lectures",
                newName: "IX_Lectures_ModuleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lectures",
                table: "Lectures",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lectures_Modules_ModuleId",
                table: "Lectures",
                column: "ModuleId",
                principalTable: "Modules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lectures_Modules_ModuleId",
                table: "Lectures");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lectures",
                table: "Lectures");

            migrationBuilder.RenameTable(
                name: "Lectures",
                newName: "Lecture");

            migrationBuilder.RenameIndex(
                name: "IX_Lectures_ModuleId",
                table: "Lecture",
                newName: "IX_Lecture_ModuleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lecture",
                table: "Lecture",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lecture_Modules_ModuleId",
                table: "Lecture",
                column: "ModuleId",
                principalTable: "Modules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
