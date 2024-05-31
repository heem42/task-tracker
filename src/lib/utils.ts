import { type ClassValue, clsx } from "clsx"
import moment from 'moment';
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getISODate(date: Date) {
  return date.toISOString().split('T')[0];
}

export function getDeadlineString(date: string) {
  const days = moment().diff(date, 'days');

  switch (days) {
    case -1: {
      return 'Tommorrow'
    }
    case 0: {
      return 'Today'
    }
    case 1: {
      return 'Yesterday'
    }
    default: {
      return moment(date).fromNow()
    }
  }
}
