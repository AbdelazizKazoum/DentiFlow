/* eslint-disable prettier/prettier */
import { UserRole } from '../value-objects/user-role.enum';

export class User {
  constructor(
    public readonly id: string,
    public clinic_id: string,
    public email: string,
    public password: string,
    public full_name: string,
    public role: UserRole,
    public is_active: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  updateProfile(full_name: string, email: string): void {
    this.full_name = full_name;
    this.email = email;
    this.updatedAt = new Date();
  }

  changeRole(newRole: UserRole): void {
    this.role = newRole;
    this.updatedAt = new Date();
  }

  toggleActive(): void {
    this.is_active = !this.is_active;
    this.updatedAt = new Date();
  }
}
