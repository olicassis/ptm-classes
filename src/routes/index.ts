import { default as ClassRequestRoutes } from './classRequest'
import { default as HealthcheckRoutes } from './healthcheck'
import { default as ProfileRoutes } from './profile'
import { default as ScheduleRoutes } from './schedule'
import { default as SubjectRoutes } from './subject'

const routes = [
  HealthcheckRoutes,
  ProfileRoutes,
  SubjectRoutes,
  ScheduleRoutes,
  ClassRequestRoutes,
]

export default routes
