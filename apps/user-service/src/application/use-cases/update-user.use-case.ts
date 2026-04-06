import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UpdateUserCommand } from '../commands/update-user.command';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, command: UpdateUserCommand): Promise<User | null> {
    // Check if email is being updated and if it conflicts
    if (command.email) {
      const existingUser = await this.userRepository.findByEmail(command.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('User with this email already exists');
      }
    }

    return this.userRepository.update(id, command);
  }
}
