import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import {
  IUserRepository,
  UpdateUserDto,
} from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, updateData: UpdateUserDto): Promise<User | null> {
    // Check if email is being updated and if it conflicts
    if (updateData.email) {
      const existingUser = await this.userRepository.findByEmail(
        updateData.email,
      );
      if (existingUser && existingUser.id !== id) {
        throw new Error('User with this email already exists');
      }
    }

    return this.userRepository.update(id, updateData);
  }
}
