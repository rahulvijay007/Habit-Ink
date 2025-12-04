/**
 * StorageService.js
 * localStorage wrapper with Promise-based API simulation
 */

const STORAGE_KEY = 'habitInkData';
const API_DELAY = 200;

class StorageService {
  /**
   * Get all app data
   * @returns {Promise<Object>}
   */
  static async getData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem(STORAGE_KEY);
        resolve(data ? JSON.parse(data) : null);
      }, API_DELAY);
    });
  }

  /**
   * Save app data
   * @param {Object} data
   * @returns {Promise<void>}
   */
  static async saveData(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        resolve();
      }, API_DELAY);
    });
  }

  /**
   * Initialize with default data structure
   * @returns {Promise<Object>}
   */
  static async initialize() {
    const defaultData = {
      totalPoints: 0,
      currentStreak: 0,
      lastCompletionDate: null,
      taskHistory: [], // { date, pointsAwarded, tasksCompleted }
      tasks: [], // { id, name, tags, createdAt, lastCompleted }
      rewardsCatalog: [], // Loaded from initialRewards.js
      redeemedRewards: [], // { rewardId, token, redeemedAt }
    };

    await this.saveData(defaultData);
    return defaultData;
  }

  /**
   * Clear all data (for testing)
   * @returns {Promise<void>}
   */
  static async clearData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem(STORAGE_KEY);
        resolve();
      }, API_DELAY);
    });
  }
}

export default StorageService;
