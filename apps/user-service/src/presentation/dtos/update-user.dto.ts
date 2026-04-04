/* eslint-disable prettier/prettier */
import { UserOrmEntity } from '../../infrastructure/entities/user.orm-entity';

export type UpdateUserDto = Partial<
  Pick<UserOrmEntity, 'email' | 'full_name' | 'role' | 'is_active'>
>;
