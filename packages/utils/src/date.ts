import { format } from 'date-fns'

export function formatDate(
  date: string,
  pattern: string = 'dd/MM/yyyy',
): string {
  return format(date, pattern)
}
