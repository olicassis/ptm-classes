import { differenceInHours } from 'date-fns'

import { ProfileScheduleEntity } from '../db/entity/ProfileSchedule'

// NOTE: For now, it is assumed that each schedule has a duration of one hour
export function checkDateOverlapping(
  date: string,
  existingSchedules: ProfileScheduleEntity[],
): boolean {
  const newDate = new Date(date)

  for (const schedule of existingSchedules) {
    if (Math.abs(differenceInHours(newDate, new Date(schedule.date))) < 1) {
      return true
    }
  }

  return false
}
