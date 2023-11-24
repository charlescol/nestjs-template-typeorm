import { DefaultNamingStrategy, NamingStrategyInterface } from "typeorm";

export default class CustomNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  uniqueConstraintName(tableOrName: string, columnNames: string[]): string {
    return `UQ_${tableOrName}_${columnNames.join("_")}`;
  }

  primaryKeyName(tableOrName: string): string {
    return `${tableOrName}_pkey`;
  }

  indexName(tableOrName: string, columnNames: string[]): string {
    const columnSnakeCase = columnNames.join("_");
    if (columnSnakeCase.endsWith("Id"))
      return `${tableOrName}_${columnSnakeCase}`;
    return `${tableOrName}_${columnSnakeCase}_index`;
  }

  foreignKeyName(
    tableOrName: string,
    columnNames: string[],
    _referencedTablePath?: string | undefined
  ): string {
    return `FK_${tableOrName}_${_referencedTablePath}_${columnNames.join("_")}`;
  }
}
