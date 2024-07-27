import dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { runSeeders, SeederOptions } from 'typeorm-extension'

import { ClassRequestEntity } from './entity/ClassRequest'
import { ProfileEntity } from './entity/Profile'
import { ProfileScheduleEntity } from './entity/ProfileSchedule'
import { ProfileSubjectEntity } from './entity/ProfileSubject'
import { ClassRequestFactory } from './seeding/factories/classRequest.factory'
import { ProfileFactory } from './seeding/factories/profile.factory'
import { ProfileScheduleFactory } from './seeding/factories/profileSchedule.factory'
import { ProfileSubjectFactory } from './seeding/factories/profileSubject.factory'
import { MainSeeder } from './seeding/seeds/initialSeed'
dotenv.config({ path: '../../.env' })

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? '',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER ?? '',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_DATABASE ?? '',
  entities: [
    ProfileEntity,
    ProfileSubjectEntity,
    ProfileScheduleEntity,
    ClassRequestEntity,
  ],
  factories: [
    ProfileFactory,
    ProfileSubjectFactory,
    ProfileScheduleFactory,
    ClassRequestFactory,
  ],
  seeds: [MainSeeder],
}

const dataSource = new DataSource(options)
dataSource.initialize().then(async () => {
  await runSeeders(dataSource)
  process.exit()
})
