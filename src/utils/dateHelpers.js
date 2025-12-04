/**
 * dateHelpers.js
 * Date manipulation utilities
 */

import { format, parseISO, startOfDay, subDays } from 'date-fns';

export const formatDate = (isoString) => {
  try {
    return format(parseISO(isoString), 'MMM d, yyyy');
  } catch {
    return 'Invalid date';
  }
};

export const formatShortDate = (isoString) => {
  try {
    return format(parseISO(isoString), 'MMM d');
  } catch {
    return 'Invalid';
  }
};

export const getHoursUntilUnlock = (lastCompletionDate) => {
  if (!lastCompletionDate) return 0;

  const lastCompletion = new Date(lastCompletionDate);
  const now = new Date();
  const hoursSince = (now - lastCompletion) / (1000 * 60 * 60);

  return Math.max(0, 24 - hoursSince);
};

export const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i);
    days.push(startOfDay(date).toISOString());
  }
  return days;
};

export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};
