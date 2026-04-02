import { UserRole } from '../value-objects/user-role.enum';

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string, // hashed
    public role: UserRole,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  updateProfile(name: string, email: string): void {
    this.name = name;
    this.email = email;
    this.updatedAt = new Date();
  }

  changePassword(newPassword: string): void {
    this.password = newPassword;
    this.updatedAt = new Date();
  }

  changeRole(newRole: UserRole): void {
    this.role = newRole;
    this.updatedAt = new Date();
  }
}
