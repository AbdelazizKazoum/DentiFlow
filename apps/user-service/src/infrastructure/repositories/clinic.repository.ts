/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from 'libs/database';
import { Clinic } from '../../domain/entities/clinic.entity';
import { IClinicRepository } from '../../domain/repositories/clinic.repository.interface';
import { ClinicOrmEntity } from '../entities/clinic.orm-entity';
import { CreateClinicDto } from '../../presentation/dtos/create-clinic.dto';
import { UpdateClinicDto } from '../../presentation/dtos/update-clinic.dto';

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

  async create(createClinicData: CreateClinicDto): Promise<Clinic> {
    const entity = await super.create(createClinicData);
    return this.mapToDomain(entity);
  }

  async findById(id: string): Promise<Clinic | null> {
    const entity = await super.findById(id);
    return entity ? this.mapToDomain(entity) : null;
  }

  async findAll(): Promise<Clinic[]> {
    const entities = await super.findAll();
    return entities.map((entity) => this.mapToDomain(entity));
  }

  async update(
    id: string,
    updateData: UpdateClinicDto,
  ): Promise<Clinic | null> {
    const entity = await super.update(id, updateData);
    return entity ? this.mapToDomain(entity) : null;
  }

  async delete(id: string): Promise<boolean> {
    return super.delete(id);
  }

  async findByOwnerId(ownerId: string): Promise<Clinic[]> {
    const entities = await this.findByCondition({ owner_id: ownerId });
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
