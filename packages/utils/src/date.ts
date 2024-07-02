import { format } from 'date-fns'

export function formatDate(
  date: string,
  pattern: string = 'yyyy-MM-dd',
): string {
  return format(date, pattern)
}
