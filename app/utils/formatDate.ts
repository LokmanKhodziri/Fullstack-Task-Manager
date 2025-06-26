import { DateTime } from 'luxon';

export function formatDate(date: string | Date) {
  return DateTime.fromISO(typeof date === 'string' ? date : date.toISOString()).toFormat('dd-MM-yyyy');
}
