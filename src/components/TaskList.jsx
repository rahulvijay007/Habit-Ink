import { useHabit } from '../context/HabitContext';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';
import { MAX_TASKS } from '../utils/constants';

const TaskList = () => {
  const { state } = useHabit();

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-ink-dark">Your Tasks</h2>
          <span className="text-sm text-ink-medium bg-pastel-cream px-3 py-1 rounded-full">
            {state.tasks.length}/{MAX_TASKS} tasks
          </span>
        </div>

        <AddTaskForm />
      </div>

      <div className="space-y-3">
        {state.tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-500">No tasks yet. Add your first task above!</p>
            <p className="text-sm text-gray-400 mt-2">
              Tip: Use hashtags like #Physics or #Math to categorize your tasks
            </p>
          </div>
        ) : (
          state.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
