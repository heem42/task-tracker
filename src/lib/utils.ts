import { type ClassValue, clsx } from "clsx"
import moment from 'moment';
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDeadlineString(date: Date) {
  const days = moment().startOf('day').diff(date, 'days');

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
