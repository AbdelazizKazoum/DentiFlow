/* eslint-disable prettier/prettier */
import { Clinic } from '../entities/clinic.entity';

export interface IClinicRepository {
  create(
    clinic: Omit<Clinic, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Clinic>;
  findById(id: string): Promise<Clinic | null>;
  findAll(): Promise<Clinic[]>;
  update(
    id: string,
    updateData: Partial<Omit<Clinic, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Clinic | null>;
  delete(id: string): Promise<boolean>;
  findByOwnerId(ownerId: string): Promise<Clinic[]>;
}
