import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'libs/database';
import { UserRole } from '../../domain/value-objects/user-role.enum';

@Entity('users')
export class UserOrmEntity extends BaseEntity {
  @Column('uuid')
  clinic_id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  full_name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column({ default: true })
  is_active: boolean;
}
