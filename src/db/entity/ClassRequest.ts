import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'

import { ProfileScheduleEntity } from './ProfileSchedule'

@Entity('class_request')
@Index(['studentProfileId', 'profileScheduleId'], {
  unique: true,
})
export class ClassRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({ name: 'student_profile_id', type: 'uuid' })
  studentProfileId: string
  @Column({ name: 'profile_schedule_id', type: 'uuid' })
  profileScheduleId: string
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date

  @OneToOne(() => ProfileScheduleEntity, (schedule) => schedule.classRequest)
  @JoinColumn({ name: 'profile_schedule_id' })
  schedule: Relation<ProfileScheduleEntity>
}
