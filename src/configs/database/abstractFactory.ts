import * as Factory from "factory.ts";
import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';

export default abstract class AbstractModelFactory<Entity extends ObjectLiteral> {
  private repo: Repository<Entity>;

  constructor(repo: Repository<Entity>) {
    this.repo = repo;
  }

  abstract defaultProperties(): Partial<Entity>;

  async createMany(
    numberOfRecordToCreate: number,
    overrideProperties: Partial<Entity> = {},
  ): Promise<Partial<Entity>[]> {
    const factory = Factory.Sync.makeFactory<Partial<Entity>>(this.defaultProperties());
    return factory.buildList(numberOfRecordToCreate, overrideProperties);
  }

  async createOne(overrideProperties: Partial<Entity> = {}): Promise<Partial<Entity>> {
    const factory = Factory.Sync.makeFactory<Partial<Entity>>(this.defaultProperties());
    return factory.build(overrideProperties);
  }

  async createOneAndSaveToDb(overrideProperties: Partial<Entity> = {}, listeners = false): Promise<Entity> {
    const record = await this.createOne(overrideProperties);
    return this.repo.save(record as DeepPartial<Entity>, { listeners });
  }

  async createManyAndSaveToDb(
    numberOfRecordToCreate: number,
    overrideProperties: Partial<Entity> = {},
    listeners = false,
  ): Promise<Entity[]> {
    const recordList = await this.createMany(numberOfRecordToCreate, overrideProperties);
    return this.repo.save(recordList as DeepPartial<Entity[]>, { listeners });
  }
}
