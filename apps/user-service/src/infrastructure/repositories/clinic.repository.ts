/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from 'libs/database';
import { Clinic } from '../../domain/entities/clinic.entity';
import { IClinicRepository } from '../../domain/repositories/clinic.repository.interface';
import { ClinicOrmEntity } from '../entities/clinic.orm-entity';

@Injectable()
export class ClinicRepository
  extends AbstractRepository<ClinicOrmEntity>
  implements IClinicRepository
{
  constructor(
    @InjectRepository(ClinicOrmEntity)
    repository: Repository<ClinicOrmEntity>,
  ) {
    super(repository);
  }

  async create(
    createClinicData: Omit<Clinic, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Clinic> {
    const entity = await this._create(createClinicData as any);
    return this.mapToDomain(entity);
  }

  async findById(id: string): Promise<Clinic | null> {
    const entity = await this._findById(id);
    return entity ? this.mapToDomain(entity) : null;
  }

  async findAll(): Promise<Clinic[]> {
    const entities = await this._findAll();
    return entities.map((entity) => this.mapToDomain(entity));
  }

  async update(
    id: string,
    updateData: Omit<Clinic, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Clinic | null> {
    const entity = await this._update(id, updateData as any);
    return entity ? this.mapToDomain(entity) : null;
  }

  async delete(id: string): Promise<boolean> {
    return this._delete(id);
  }

  async findByOwnerId(ownerId: string): Promise<Clinic[]> {
    const entities = await this._findByCondition({ owner_id: ownerId });
    return entities.map((entity) => this.mapToDomain(entity));
  }

  private mapToDomain(entity: ClinicOrmEntity): Clinic {
    return new Clinic(
      entity.id,
      entity.name,
      entity.owner_id,
      entity.discount_threshold_percent,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
