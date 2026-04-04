/* eslint-disable prettier/prettier */
import { UserRole } from '../../domain/value-objects/user-role.enum';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
