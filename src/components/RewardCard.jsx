import { useState } from 'react';
import { useHabit } from '../context/HabitContext';

const RewardCard = ({ reward, onRedeemSuccess }) => {
  const { state, redeemReward } = useHabit();
  const [loading, setLoading] = useState(false);

  const canAfford = state.totalPoints >= reward.cost;
  const isRedeemed = state.redeemedRewards.some(r => r.rewardId === reward.id);

  const handleRedeem = async () => {
    if (!canAfford) {
      alert(`You need ${reward.cost - state.totalPoints} more points!`);
      return;
    }

    if (window.confirm(`Redeem "${reward.name}" for ${reward.cost} points?`)) {
      try {
        setLoading(true);
        const result = await redeemReward(reward.id);
        onRedeemSuccess(result);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className={`
      bg-white rounded-lg shadow-md p-4 border-2 transition-all
      ${canAfford ? 'border-pastel-lavender hover:shadow-lg hover:scale-105' : 'border-gray-200 opacity-75'}
    `}
    >
      <div className="text-5xl mb-3 text-center">{reward.icon}</div>

      <h3 className="text-lg font-semibold text-ink-dark mb-1 text-center">
        {reward.name}
      </h3>

      <p className="text-sm text-gray-600 mb-3 text-center h-10">
        {reward.description}
      </p>

      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl font-bold text-pastel-lavender">
          {reward.cost}
        </span>
        <span className="text-sm text-ink-medium">points</span>
      </div>

      <button
        onClick={handleRedeem}
        disabled={!canAfford || loading || isRedeemed}
        className={`
          w-full py-2 px-4 rounded-lg font-medium transition-all
          ${canAfford && !isRedeemed
            ? 'bg-pastel-peach hover:bg-orange-300 text-ink-dark'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        {loading ? 'Redeeming...' : isRedeemed ? 'Redeemed ✓' : canAfford ? 'Redeem' : 'Not enough points'}
      </button>
    </div>
  );
};

export default RewardCard;
