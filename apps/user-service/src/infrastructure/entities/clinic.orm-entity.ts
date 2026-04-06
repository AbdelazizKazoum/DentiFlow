/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity('clinics')
export class ClinicOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid')
  owner_id: string;

  @ManyToOne(() => UserOrmEntity, { nullable: true, lazy: true })
  @JoinColumn({ name: 'owner_id' })
  owner: UserOrmEntity;

  @OneToMany(() => UserOrmEntity, (user) => user.clinic)
  users: UserOrmEntity[];

  @Column({ type: 'int', default: 10 })
  discount_threshold_percent: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
