import { useHabit } from '../context/HabitContext';

const StatsPanel = () => {
  const { state } = useHabit();

  const totalTasksCompleted = state.taskHistory.length;
  const avgPointsPerDay = totalTasksCompleted > 0
    ? Math.round(state.taskHistory.reduce((sum, entry) => sum + entry.pointsAwarded, 0) / totalTasksCompleted)
    : 0;

  const stats = [
    {
      label: 'Current Streak',
      value: state.currentStreak,
      suffix: 'days',
      icon: '🔥',
      color: 'bg-orange-100 border-orange-300 text-orange-700',
    },
    {
      label: 'Total Points',
      value: state.totalPoints,
      suffix: 'pts',
      icon: '⭐',
      color: 'bg-yellow-100 border-yellow-300 text-yellow-700',
    },
    {
      label: 'Tasks Completed',
      value: totalTasksCompleted,
      suffix: '',
      icon: '✅',
      color: 'bg-green-100 border-green-300 text-green-700',
    },
    {
      label: 'Avg Points/Task',
      value: avgPointsPerDay,
      suffix: 'pts',
      icon: '📊',
      color: 'bg-blue-100 border-blue-300 text-blue-700',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-ink-dark mb-4">Your Statistics</h2>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-lg p-4 border-2 transition-transform hover:scale-105`}
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold">
              {stat.value} {stat.suffix}
            </div>
            <div className="text-xs uppercase tracking-wide opacity-75">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {state.currentStreak > 0 && (
        <div className="mt-4 bg-pastel-cream rounded-lg p-3 text-center">
          <p className="text-sm text-ink-medium">
            <span className="font-semibold">√Streak Bonus:</span>{' '}
            +{(2.5 * Math.sqrt(state.currentStreak)).toFixed(1)} pts per task
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;
