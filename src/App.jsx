import { HabitProvider, useHabit } from './context/HabitContext';
import Header from './components/Header';
import TaskList from './components/TaskList';
import ConsistencyCurve from './components/ConsistencyCurve';
import RewardsCatalog from './components/RewardsCatalog';
import StatsPanel from './components/StatsPanel';

function AppContent() {
  const { loading, error, clearError } = useHabit();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pastel-cream via-pastel-mint to-pastel-lavender flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4 animate-spin">⏳</div>
          <p className="text-xl text-ink-dark">Loading Habit Ink...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-cream via-pastel-mint to-pastel-lavender">
      <Header />

      {error && (
        <div className="container mx-auto px-4 pt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="text-red-700 hover:text-red-900 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Task Management */}
          <div className="space-y-6">
            <TaskList />
          </div>

          {/* Center Column: Visualization */}
          <div className="space-y-6">
            <StatsPanel />
            <ConsistencyCurve />
          </div>

          {/* Right Column: Rewards */}
          <div>
            <RewardsCatalog />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm text-ink-medium">
          Built with ❤️ using the √Streak Adaptive Reward Algorithm
        </p>
        <p className="text-xs text-ink-medium mt-1">
          Formula: Points = (10 × Tasks) + (2.5 × √Streak)
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <HabitProvider>
      <AppContent />
    </HabitProvider>
  );
}

export default App;
