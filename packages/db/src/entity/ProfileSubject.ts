import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'

import { ProfileEntity } from './Profile'

@Entity('profile_subject')
export class ProfileSubjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({ name: 'profile_id', type: 'uuid', nullable: false })
  profileId: string
  @Column({ name: 'label', type: 'varchar', nullable: false })
  label: string
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt?: Date

  @ManyToOne(() => ProfileEntity, (profile) => profile.profileSubject)
  profile: Relation<ProfileEntity>
}
