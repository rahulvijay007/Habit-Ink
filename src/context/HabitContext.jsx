/**
 * HabitContext.jsx
 * Global state management for Habit Ink
 */

import { createContext, useContext, useState, useEffect } from 'react';
import StorageService from '../engine/StorageService';
import AlgorithmEngine from '../engine/AlgorithmEngine';
import { INITIAL_REWARDS } from '../data/initialRewards';
import { parseHashtags, validateTaskName, canAddTask, generateTaskId } from '../utils/validators';

const HabitContext = createContext();

export const useHabit = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabit must be used within HabitProvider');
  }
  return context;
};

export const HabitProvider = ({ children }) => {
  const [state, setState] = useState({
    totalPoints: 0,
    currentStreak: 0,
    lastCompletionDate: null,
    taskHistory: [],
    tasks: [],
    rewardsCatalog: INITIAL_REWARDS,
    redeemedRewards: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        let data = await StorageService.getData();

        if (!data) {
          data = await StorageService.initialize();
          data.rewardsCatalog = INITIAL_REWARDS;
          await StorageService.saveData(data);
        } else {
          // Ensure rewardsCatalog is always loaded
          if (!data.rewardsCatalog || data.rewardsCatalog.length === 0) {
            data.rewardsCatalog = INITIAL_REWARDS;
            await StorageService.saveData(data);
          }
        }

        setState(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Persist state changes
  const updateState = async (newState) => {
    setState(newState);
    await StorageService.saveData(newState);
  };

  // Add new task
  const addTask = async (taskName) => {
    try {
      // Validate task name
      const validationError = validateTaskName(taskName);
      if (validationError) {
        throw new Error(validationError);
      }

      // Check task limit
      if (!canAddTask(state.tasks.length)) {
        throw new Error(`Maximum ${5} tasks allowed`);
      }

      // Parse hashtags from task name
      const tags = parseHashtags(taskName);

      const newTask = {
        id: generateTaskId(),
        name: taskName,
        tags: tags,
        createdAt: new Date().toISOString(),
        lastCompleted: null,
      };

      await updateState({
        ...state,
        tasks: [...state.tasks, newTask],
      });

      return newTask;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await updateState({
        ...state,
        tasks: state.tasks.filter(t => t.id !== taskId),
      });
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Complete task (Daily Done)
  const completeTask = async (taskId) => {
    try {
      const task = state.tasks.find(t => t.id === taskId);
      if (!task) {
        throw new Error('Task not found');
      }

      // Check 24-hour lockout
      const canComplete = await AlgorithmEngine.canCompleteTask(task.lastCompleted);
      if (!canComplete) {
        throw new Error('Task already completed today. Come back in 24 hours!');
      }

      // Calculate points
      const tasksCompletedToday = 1; // For MVP, assume 1 task per click
      const pointsAwarded = await AlgorithmEngine.calculateReward(
        tasksCompletedToday,
        state.currentStreak
      );

      // Update streak
      const newStreak = await AlgorithmEngine.updateStreak(
        state.lastCompletionDate,
        state.currentStreak
      );

      const now = new Date().toISOString();

      // Update state
      await updateState({
        ...state,
        totalPoints: state.totalPoints + pointsAwarded,
        currentStreak: newStreak,
        lastCompletionDate: now,
        tasks: state.tasks.map(t =>
          t.id === taskId ? { ...t, lastCompleted: now } : t
        ),
        taskHistory: [
          ...state.taskHistory,
          {
            date: now,
            pointsAwarded,
            tasksCompleted: 1,
            taskId: taskId,
            taskName: task.name,
          },
        ],
      });

      return { pointsAwarded, newStreak };
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Redeem reward
  const redeemReward = async (rewardId) => {
    try {
      const reward = state.rewardsCatalog.find(r => r.id === rewardId);
      if (!reward) {
        throw new Error('Reward not found');
      }

      if (state.totalPoints < reward.cost) {
        throw new Error('Insufficient points');
      }

      // Generate redemption token
      const token = `HABIT-INK-${reward.code}${Math.floor(Math.random() * 1000)}`;

      await updateState({
        ...state,
        totalPoints: state.totalPoints - reward.cost,
        redeemedRewards: [
          ...state.redeemedRewards,
          {
            rewardId,
            rewardName: reward.name,
            token,
            redeemedAt: new Date().toISOString(),
          },
        ],
      });

      return { token, reward };
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Reset all data (for testing)
  const resetData = async () => {
    try {
      await StorageService.clearData();
      const newData = await StorageService.initialize();
      newData.rewardsCatalog = INITIAL_REWARDS;
      await StorageService.saveData(newData);
      setState(newData);
    } catch (err) {
      setError('Failed to reset data');
    }
  };

  const value = {
    state,
    loading,
    error,
    addTask,
    deleteTask,
    completeTask,
    redeemReward,
    clearError,
    resetData,
  };

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
};
