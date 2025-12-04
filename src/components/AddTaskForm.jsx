import { useState } from 'react';
import { useHabit } from '../context/HabitContext';
import { MAX_TASKS } from '../utils/constants';

const AddTaskForm = () => {
  const { state, addTask } = useHabit();
  const [taskName, setTaskName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const canAdd = state.tasks.length < MAX_TASKS;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName.trim()) {
      alert('Please enter a task name');
      return;
    }

    try {
      setLoading(true);
      await addTask(taskName);
      setTaskName('');
      setIsExpanded(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!canAdd) {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
        <p className="text-orange-700 text-sm">
          Maximum {MAX_TASKS} tasks reached. Complete or delete a task to add more.
        </p>
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full py-3 px-4 bg-pastel-mint hover:bg-green-200 text-ink-dark rounded-lg font-medium transition-all transform hover:scale-105 flex items-center justify-center gap-2"
      >
        <span className="text-xl">+</span>
        Add New Task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task (e.g., Study for 30 min #Physics)"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pastel-lavender focus:outline-none transition-colors"
          autoFocus
          maxLength={100}
        />
        <p className="text-xs text-gray-500 mt-1">
          Tip: Use #hashtags to categorize your tasks
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2 px-4 bg-pastel-lavender hover:bg-purple-300 text-ink-dark rounded-lg font-medium transition-all disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsExpanded(false);
            setTaskName('');
          }}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
