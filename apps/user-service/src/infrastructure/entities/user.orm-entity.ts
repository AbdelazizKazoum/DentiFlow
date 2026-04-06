import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'libs/database';
import { UserRole } from '../../domain/value-objects/user-role.enum';
import { ClinicOrmEntity } from './clinic.orm-entity';

@Entity('users')
export class UserOrmEntity extends BaseEntity {
  @Column('uuid')
  clinic_id: string;

  @ManyToOne(() => ClinicOrmEntity, { nullable: false, lazy: true })
  @JoinColumn({ name: 'clinic_id' })
  clinic: ClinicOrmEntity;

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
