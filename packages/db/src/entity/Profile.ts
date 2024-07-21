import { ProfileRole, ProfileStatus } from '@ptm/enums/src/enums/profile'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'

import { ProfileScheduleEntity } from './ProfileSchedule'
import { ProfileSubjectEntity } from './ProfileSubject'

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({ name: 'first_name', type: 'varchar', nullable: false })
  firstName: string
  @Column({ name: 'last_name', type: 'varchar', nullable: false })
  lastName: string
  @Column({ name: 'avatar', type: 'varchar', unique: true, nullable: false })
  avatar: string
  @Column({ name: 'username', type: 'varchar', unique: true, nullable: false })
  username: string
  @Column({ name: 'role', type: 'varchar' })
  role: ProfileRole
  @Column({ name: 'status', type: 'date' })
  status: ProfileStatus = ProfileStatus.UNVERIFIED
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt?: Date

  @OneToMany(
    () => ProfileScheduleEntity,
    (profileSchedule) => profileSchedule.profile,
  )
  profileSchedule: Relation<ProfileScheduleEntity>[]

  @OneToMany(
    () => ProfileSubjectEntity,
    (profileSubject) => profileSubject.profile,
  )
  profileSubject: Relation<ProfileSubjectEntity>[]
}
