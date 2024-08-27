import { default as HealthcheckRoutes } from './healthcheck'
import { default as ProfileRoutes } from './profile'
import { default as ScheduleRoutes } from './schedule'
import { default as SubjectRoutes } from './subject'

const routes = [HealthcheckRoutes, ProfileRoutes, SubjectRoutes, ScheduleRoutes]

export default routes
