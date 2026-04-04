/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from 'libs/database';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserOrmEntity } from '../entities/user.orm-entity';

@Injectable()
export class UserRepository
  extends AbstractRepository<UserOrmEntity>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserOrmEntity)
    repository: Repository<UserOrmEntity>,
  ) {
    super(repository);
  }

  async create(
    User: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    const entity = await this._create(User);
    return this.mapToDomain(entity);
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this._findById(id);
    return entity ? this.mapToDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this._findOneByCondition({ email });
    return entity ? this.mapToDomain(entity) : null;
  }

  async findAll(): Promise<User[]> {
    const entities = await this._findAll();
    return entities.map((entity) => this.mapToDomain(entity));
  }

  async update(
    id: string,
    updateData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User | null> {
    const entity = await this._update(id, updateData as any);
    return entity ? this.mapToDomain(entity) : null;
  }

  async delete(id: string): Promise<boolean> {
    return this._delete(id);
  }

  private mapToDomain(entity: UserOrmEntity): User {
    return new User(
      entity.id,
      entity.clinic_id,
      entity.email,
      entity.password,
      entity.full_name,
      entity.role,
      entity.is_active,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
