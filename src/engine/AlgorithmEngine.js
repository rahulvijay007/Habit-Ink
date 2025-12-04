/**
 * AlgorithmEngine.js
 * Core reward calculation using Variable Ratio Reinforcement
 *
 * Formula: Points = (10 × T_completed) + (2.5 × √CurrentStreak)
 * All methods return Promises to simulate API latency
 */

const API_DELAY = 300; // Simulate 300ms API call

class AlgorithmEngine {
  /**
   * Calculate reward points for task completion
   * @param {number} tasksCompleted - Number of tasks completed today
   * @param {number} currentStreak - Current streak count
   * @returns {Promise<number>} - Points awarded
   */
  static async calculateReward(tasksCompleted, currentStreak) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const basePoints = 10 * tasksCompleted;
        const streakBonus = 2.5 * Math.sqrt(currentStreak);
        const totalPoints = Math.round(basePoints + streakBonus);

        resolve(totalPoints);
      }, API_DELAY);
    });
  }

  /**
   * Check if user can complete task (24-hour lockout)
   * @param {string} lastCompletionDate - ISO timestamp
   * @returns {Promise<boolean>}
   */
  static async canCompleteTask(lastCompletionDate) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!lastCompletionDate) {
          resolve(true);
          return;
        }

        const lastCompletion = new Date(lastCompletionDate);
        const now = new Date();
        const hoursSince = (now - lastCompletion) / (1000 * 60 * 60);

        resolve(hoursSince >= 24);
      }, API_DELAY);
    });
  }

  /**
   * Update streak based on completion date
   * @param {string} lastCompletionDate - ISO timestamp
   * @param {number} currentStreak - Current streak count
   * @returns {Promise<number>} - New streak count
   */
  static async updateStreak(lastCompletionDate, currentStreak) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!lastCompletionDate) {
          resolve(1); // First completion
          return;
        }

        const lastCompletion = new Date(lastCompletionDate);
        const today = new Date();

        // Reset time to start of day for comparison
        lastCompletion.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const daysDiff = Math.floor((today - lastCompletion) / (1000 * 60 * 60 * 24));

        if (daysDiff === 1) {
          resolve(currentStreak + 1); // Consecutive day
        } else if (daysDiff > 1) {
          resolve(1); // Streak broken, restart
        } else {
          resolve(currentStreak); // Same day, no change
        }
      }, API_DELAY);
    });
  }
}

export default AlgorithmEngine;
