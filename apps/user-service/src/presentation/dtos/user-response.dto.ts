import { User } from '../../domain/entities/user.entity';

export class UserResponseDto {
  id: string;
  clinic_id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.clinic_id = user.clinic_id;
    this.email = user.email;
    this.full_name = user.full_name;
    this.role = user.role;
    this.is_active = user.is_active;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
