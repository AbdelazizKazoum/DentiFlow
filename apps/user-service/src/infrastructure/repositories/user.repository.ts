import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from '@app/database';
import { User } from '../../domain/entities/user.entity';
import { UserEntity } from '../entities/user.entity';
import {
  IUserRepository,
  CreateUserDto,
  UpdateUserDto,
} from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository
  extends AbstractRepository<UserEntity>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const entity = await super.create(createUserDto);
    return this.mapToDomain(entity);
  }

  async findById(id: string): Promise<User | null> {
    const entity = await super.findById(id);
    return entity ? this.mapToDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.findOneByCondition({ email });
    return entity ? this.mapToDomain(entity) : null;
  }

  async findAll(): Promise<User[]> {
    const entities = await super.findAll();
    return entities.map((entity) => this.mapToDomain(entity));
  }

  async update(id: string, updateData: UpdateUserDto): Promise<User | null> {
    const entity = await super.update(id, updateData);
    return entity ? this.mapToDomain(entity) : null;
  }

  async delete(id: string): Promise<boolean> {
    return super.delete(id);
  }

  private mapToDomain(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.name,
      entity.email,
      entity.password,
      entity.role,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
