import { useState } from 'react';
import { useHabit } from '../context/HabitContext';
import RewardCard from './RewardCard';
import RedemptionModal from './RedemptionModal';

const RewardsCatalog = () => {
  const { state } = useHabit();
  const [redemptionResult, setRedemptionResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleRedeemSuccess = (result) => {
    setRedemptionResult(result);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setRedemptionResult(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-ink-dark mb-2">Rewards Store</h2>
      <p className="text-sm text-ink-medium mb-4">
        Redeem your points for stationery rewards!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {state.rewardsCatalog.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            onRedeemSuccess={handleRedeemSuccess}
          />
        ))}
      </div>

      {showModal && redemptionResult && (
        <RedemptionModal
          result={redemptionResult}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default RewardsCatalog;
