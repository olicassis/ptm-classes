import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
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
  @Column({ name: 'profile_id', type: 'uuid' })
  profileId: string
  @Column({ name: 'label', type: 'varchar' })
  label: string
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date

  @ManyToOne(() => ProfileEntity, (profile) => profile.profileSubject)
  @JoinColumn({ name: 'profile_id' })
  profile: Relation<ProfileEntity>
}
