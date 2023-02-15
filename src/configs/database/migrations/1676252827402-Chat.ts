import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Chat1676252827402 implements MigrationInterface {
  name = "Chat1676252827402";

  chatTableName = "chat";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.chatTableName,
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "fileId",
            type: "int",
          },
          {
            name: "userId",
            type: "int",
          },
          {
            name: "position",
            type: "int",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.chatTableName);
  }
}
