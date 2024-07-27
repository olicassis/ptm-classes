import { ProfileScheduleStatus } from '@ptm/enums/src/enums/profile'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'

import { ClassRequestEntity } from './ClassRequest'
import { ProfileEntity } from './Profile'

@Entity('profile_schedule')
export class ProfileScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({ name: 'profile_id', type: 'uuid' })
  profileId: string
  @Column({ name: 'date', type: 'timestamp' })
  date: Date
  @Column({ name: 'status', type: 'varchar' })
  status: ProfileScheduleStatus = ProfileScheduleStatus.UNAVAILABLE
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date

  @OneToOne(() => ClassRequestEntity, (classRequest) => classRequest.schedule)
  classRequest: Relation<ClassRequestEntity>

  @ManyToOne(() => ProfileEntity, (profile) => profile.profileSchedule)
  @JoinColumn({ name: 'profile_id' })
  profile: Relation<ProfileEntity>
}
