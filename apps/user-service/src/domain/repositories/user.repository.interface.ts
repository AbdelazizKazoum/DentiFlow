import { User } from '../entities/user.entity';
import { UserRole } from '../value-objects/user-role.enum';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: UserRole;
}

export interface IUserRepository {
  create(user: CreateUserDto): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, updateData: UpdateUserDto): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
