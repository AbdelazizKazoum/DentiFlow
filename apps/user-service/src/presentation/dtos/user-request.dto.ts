import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { UserRole } from '../../domain/value-objects/user-role.enum';

export class CreateUserRequestDto {
  @IsString()
  clinic_id: string;

  @IsString()
  email: string;

  @IsString()
  full_name: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class UpdateUserRequestDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
