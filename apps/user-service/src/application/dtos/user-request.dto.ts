import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../domain/value-objects/user-role.enum';

export class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}

export class UpdateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsEmail()
  email?: string;

  @IsEnum(UserRole)
  role?: UserRole;
}
