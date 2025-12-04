import { useHabit } from '../context/HabitContext';

const Header = () => {
  const { state } = useHabit();

  return (
    <header className="bg-gradient-to-r from-pastel-lavender via-pastel-mint to-pastel-peach shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo/Title */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-handwriting font-bold text-ink-dark flex items-center gap-2">
              <span className="text-5xl">✒️</span>
              Habit Ink
            </h1>
            <p className="text-sm text-ink-medium mt-1 font-clean">
              Adaptive Consistency Reinforcement
            </p>
          </div>

          {/* Stats Display */}
          <div className="flex gap-6">
            {/* Points Display */}
            <div className="bg-white rounded-lg shadow-md px-6 py-3 text-center min-w-[140px] transform transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-pastel-lavender transition-all duration-500">
                {state.totalPoints}
              </div>
              <div className="text-xs text-ink-medium uppercase tracking-wide">
                Points
              </div>
            </div>

            {/* Streak Display */}
            <div className="bg-white rounded-lg shadow-md px-6 py-3 text-center min-w-[140px] transform transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-orange-500 flex items-center justify-center gap-1 transition-all duration-500">
                {state.currentStreak > 0 && <span>🔥</span>}
                {state.currentStreak}
              </div>
              <div className="text-xs text-ink-medium uppercase tracking-wide">
                Day Streak
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
