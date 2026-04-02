import { Repository, ObjectLiteral } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export abstract class AbstractRepository<T extends ObjectLiteral> {
  constructor(
    @InjectRepository(Object)
    protected readonly repository: Repository<T>,
  ) {}

  async create(data: Partial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    await this.repository.update(id, data as any);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }

  async findByCondition(condition: Partial<T>): Promise<T[]> {
    return this.repository.find({ where: condition as any });
  }

  async findOneByCondition(condition: Partial<T>): Promise<T | null> {
    return this.repository.findOne({ where: condition as any });
  }
}