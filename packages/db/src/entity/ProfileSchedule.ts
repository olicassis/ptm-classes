import { ProfileScheduleStatus } from '@ptm/enums/src/enums/profile'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
  @Column({ name: 'profile_id', type: 'uuid', nullable: false })
  profileId: string
  @Column({ name: 'date', type: 'timestamp', nullable: false })
  date: string
  @Column({ name: 'status', type: 'varchar', nullable: false })
  status: ProfileScheduleStatus = ProfileScheduleStatus.UNAVAILABLE
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt?: Date

  @OneToOne(() => ClassRequestEntity, (classRequest) => classRequest.schedule)
  classRequest: Relation<ClassRequestEntity>

  @ManyToOne(() => ProfileEntity, (profile) => profile.profileSchedule)
  profile: Relation<ProfileEntity>
}
