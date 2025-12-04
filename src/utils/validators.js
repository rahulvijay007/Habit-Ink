/**
 * validators.js
 * Validation utilities
 */

import { MAX_TASKS } from './constants';

export const canAddTask = (currentTaskCount) => {
  return currentTaskCount < MAX_TASKS;
};

export const parseHashtags = (taskName) => {
  const regex = /#[\w]+/g;
  const matches = taskName.match(regex);
  return matches ? matches.map(tag => tag.slice(1)) : [];
};

export const validateTaskName = (name) => {
  if (!name || name.trim().length === 0) {
    return 'Task name cannot be empty';
  }
  if (name.length > 100) {
    return 'Task name too long (max 100 characters)';
  }
  return null;
};

export const generateTaskId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};
