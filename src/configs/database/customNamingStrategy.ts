import { DefaultNamingStrategy, Table, NamingStrategyInterface } from "typeorm";

export default class CustomNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  uniqueConstraintName(
    tableOrName: string | Table,
    columnNames: string[]
  ): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    return `UQ_${table}_${columnNames.join("_")}`;
  }

  primaryKeyName(tableOrName: Table | string): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    return `${table}_pkey`;
  }

  indexName(tableOrName: string | Table, columnNames: string[]): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnSnakeCase = columnNames.join("_");
    if (columnSnakeCase.endsWith("Id")) return `${table}_${columnSnakeCase}`;
    return `${table}_${columnSnakeCase}_index`;
  }

  foreignKeyName(
    tableOrName: string | Table,
    columnNames: string[],
    _referencedTablePath?: string | undefined
  ): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    return `FK_${table}_${_referencedTablePath}_${columnNames.join("_")}`;
  }
}
