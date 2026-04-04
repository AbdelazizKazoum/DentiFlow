/* eslint-disable prettier/prettier */
import {
  Repository,
  ObjectLiteral,
  FindOptionsWhere,
  DeepPartial,
  QueryDeepPartialEntity,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export abstract class AbstractRepository<
  T extends ObjectLiteral & { id: string },
> {
  constructor(
    @InjectRepository(Object)
    protected readonly repository: Repository<T>,
  ) {}

  protected async _create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    const saved = await this.repository.save(entity);
    return saved;
  }

  protected async _findById(id: string): Promise<T | null> {
    return this.repository.findOne({ where: { id } as FindOptionsWhere<T> });
  }

  protected async _findAll(): Promise<T[]> {
    return this.repository.find();
  }

  protected async _update(
    id: string,
    data: QueryDeepPartialEntity<T>,
  ): Promise<T | null> {
    await this.repository.update(id, data);
    return this._findById(id);
  }

  protected async _delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  protected async _findByCondition(
    condition: FindOptionsWhere<T>,
  ): Promise<T[]> {
    return this.repository.find({ where: condition });
  }

  protected async _findOneByCondition(
    condition: FindOptionsWhere<T>,
  ): Promise<T | null> {
    return this.repository.findOne({ where: condition });
  }
}
