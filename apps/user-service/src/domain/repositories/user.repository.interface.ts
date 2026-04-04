/* eslint-disable prettier/prettier */
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../../presentation/dtos/create-user.dto';
import { UpdateUserDto } from '../../presentation/dtos/update-user.dto';

export interface IUserRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, updateData: UpdateUserDto): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
