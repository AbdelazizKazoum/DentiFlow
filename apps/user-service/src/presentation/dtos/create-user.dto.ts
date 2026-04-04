/* eslint-disable prettier/prettier */
import { UserOrmEntity } from '../../infrastructure/entities/user.orm-entity';

export type CreateUserDto = Pick<
  UserOrmEntity,
  'clinic_id' | 'email' | 'full_name' | 'role'
> & { is_active?: boolean };
