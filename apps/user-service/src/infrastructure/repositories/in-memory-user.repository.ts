import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import {
  IUserRepository,
  CreateUserDto,
  UpdateUserDto,
} from '../../domain/repositories/user.repository.interface';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];
  private idCounter = 1;

  async create(createUserDto: CreateUserDto): Promise<User> {
    const id = this.idCounter.toString();
    this.idCounter++;
    const now = new Date();
    const user = new User(
      id,
      createUserDto.name,
      createUserDto.email,
      createUserDto.password, // In real app, hash it
      createUserDto.role,
      now,
      now,
    );
    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async update(id: string, updateData: UpdateUserDto): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;

    const user = this.users[userIndex];
    if (updateData.name) user.name = updateData.name;
    if (updateData.email) user.email = updateData.email;
    if (updateData.role) user.role = updateData.role;
    user.updatedAt = new Date();

    return user;
  }

  async delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);
    return true;
  }
}
