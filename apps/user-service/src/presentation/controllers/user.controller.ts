import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
} from '../dtos/user-request.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { UpdateUserCommand } from '../../application/commands/update-user.command';
import { DeleteUserCommand } from '../../application/commands/delete-user.command';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const command = new CreateUserCommand(
      createUserDto.clinic_id,
      createUserDto.email,
      createUserDto.full_name,
      createUserDto.role,
      createUserDto.is_active,
    );
    const user = await this.createUserUseCase.execute(command);
    return new UserResponseDto(user);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.getAllUsersUseCase.execute();
    return users.map((user) => new UserResponseDto(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto | null> {
    const user = await this.getUserByIdUseCase.execute(id);
    return user ? new UserResponseDto(user) : null;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto | null> {
    const command = new UpdateUserCommand(
      updateUserDto.email,
      updateUserDto.full_name,
      updateUserDto.role,
      updateUserDto.is_active,
    );
    const user = await this.updateUserUseCase.execute(id, command);
    return user ? new UserResponseDto(user) : null;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    const command = new DeleteUserCommand(id);
    const deleted = await this.deleteUserUseCase.execute(command);
    return { deleted };
  }
}
