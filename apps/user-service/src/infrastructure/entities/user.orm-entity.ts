import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'libs/database';
import { UserRole } from '../../domain/value-objects/user-role.enum';

@Entity('users')
export class UserOrmEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;
}
