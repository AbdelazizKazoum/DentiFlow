/* eslint-disable prettier/prettier */
import { UserRole } from '../../domain/value-objects/user-role.enum';

export class CreateUserCommand {
  constructor(
    public readonly clinic_id: string,
    public readonly email: string,
    public readonly full_name: string,
    public readonly role: UserRole,
    public readonly is_active?: boolean,
  ) {}
}
