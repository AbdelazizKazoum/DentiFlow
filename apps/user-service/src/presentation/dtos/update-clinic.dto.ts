/* eslint-disable prettier/prettier */
import { ClinicOrmEntity } from '../../infrastructure/entities/clinic.orm-entity';

export type UpdateClinicDto = Partial<
  Pick<ClinicOrmEntity, 'name' | 'owner_id' | 'discount_threshold_percent'>
>;
