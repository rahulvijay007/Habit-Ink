import { useState, useEffect } from 'react';
import { useHabit } from '../context/HabitContext';
import { getHoursUntilUnlock } from '../utils/dateHelpers';

const TaskCard = ({ task }) => {
  const { completeTask, deleteTask } = useHabit();
  const [animating, setAnimating] = useState(false);
  const [hoursUntilUnlock, setHoursUntilUnlock] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const checkLockout = () => {
      const hours = getHoursUntilUnlock(task.lastCompleted);
      setHoursUntilUnlock(hours);
    };

    checkLockout();
    const interval = setInterval(checkLockout, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [task.lastCompleted]);

  const handleComplete = async () => {
    try {
      setLoading(true);
      setAnimating(true);

      const result = await completeTask(task.id);

      // Show success feedback
      setSuccessMessage(`+${result.pointsAwarded} points! Streak: ${result.newStreak} days`);

      setTimeout(() => {
        setAnimating(false);
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      alert(error.message);
      setAnimating(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete task "${task.name}"?`)) {
      try {
        await deleteTask(task.id);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const isLocked = hoursUntilUnlock > 0;

  return (
    <div
      className={`
      bg-white rounded-lg shadow-md p-4
      transition-all duration-300
      ${animating ? 'pen-stroke-effect border-4 border-pastel-lavender scale-105' : 'border border-gray-200'}
    `}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-ink-dark flex-1">
          {task.name}
        </h3>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 transition-colors ml-2"
          title="Delete task"
        >
          ✕
        </button>
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-pastel-mint px-2 py-1 rounded-full text-ink-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {successMessage && (
        <div className="mb-3 text-sm text-green-600 font-semibold bg-green-50 px-3 py-2 rounded-lg animate-pulse">
          {successMessage}
        </div>
      )}

      <button
        onClick={handleComplete}
        disabled={isLocked || loading}
        className={`
          w-full py-2 px-4 rounded-lg font-medium transition-all
          ${isLocked
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-pastel-lavender hover:bg-purple-300 text-ink-dark hover:shadow-lg transform hover:scale-105'
          }
        `}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⏳</span>
            Processing...
          </span>
        ) : isLocked ? (
          `Unlocks in ${Math.ceil(hoursUntilUnlock)}h`
        ) : (
          'Daily Done ✓'
        )}
      </button>
    </div>
  );
};

export default TaskCard;
