/* eslint-disable prettier/prettier */
import { UserRole } from '../../domain/value-objects/user-role.enum';

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: UserRole;
}
