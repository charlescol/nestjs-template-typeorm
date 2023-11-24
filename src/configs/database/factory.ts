// eslint-disable-next-line import/no-extraneous-dependencies
import * as Factory from "factory.ts";
import { DeepPartial, ObjectLiteral, Repository } from "typeorm";

export default abstract class AbstractModelFactory<
  Entity extends ObjectLiteral
> {
  private repo: Repository<Entity>;

  constructor(repo: Repository<Entity>) {
    this.repo = repo;
  }

  abstract defaultProperties(): DeepPartial<Entity>;

  async createMany(
    numberOfRecordToCreate: number,
    overrideProperties: DeepPartial<Entity>
  ): Promise<DeepPartial<Entity>[]> {
    const factory = Factory.Sync.makeFactory<DeepPartial<Entity>>(
      this.defaultProperties()
    );
    return factory.buildList(numberOfRecordToCreate, overrideProperties || {});
  }

  async createOne(
    overrideProperties: DeepPartial<Entity>
  ): Promise<DeepPartial<Entity>> {
    const factory = Factory.Sync.makeFactory<DeepPartial<Entity>>(
      this.defaultProperties()
    );
    return factory.build(overrideProperties || {});
  }

  async createOneAndSaveToDb(
    overrideProperties: DeepPartial<Entity>,
    listeners = false
  ): Promise<Entity> {
    const record = await this.createOne(overrideProperties);
    return this.repo.save(record, { listeners });
  }

  async createManyAndSaveToDb(
    numberOfRecordToCreate: number,
    overrideProperties: DeepPartial<Entity>,
    listeners = false
  ): Promise<Entity[]> {
    const recordList = await this.createMany(
      numberOfRecordToCreate,
      overrideProperties
    );
    return this.repo.save(recordList, { listeners });
  }
}
