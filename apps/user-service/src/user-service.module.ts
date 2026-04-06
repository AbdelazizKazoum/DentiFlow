/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'libs/database';
import { UserController } from './presentation/controllers/user.controller';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { ClinicOrmEntity } from './infrastructure/entities/clinic.orm-entity';
import { UserOrmEntity } from './infrastructure/entities/user.orm-entity';
import { ClinicRepository } from './infrastructure/repositories/clinic.repository';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([UserOrmEntity, ClinicOrmEntity]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IClinicRepository',
      useClass: ClinicRepository,
    },

    CreateUserUseCase,
    GetUserByIdUseCase,
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserServiceModule {}
