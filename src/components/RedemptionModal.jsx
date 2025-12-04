import { useState } from 'react';

const RedemptionModal = ({ result, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative animate-bounce-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ✕
        </button>

        {/* Success animation */}
        <div className="text-center mb-6">
          <div className="text-8xl mb-4 animate-pulse">
            {result.reward.icon}
          </div>
          <h2 className="text-3xl font-bold text-green-600 mb-2">
            Success!
          </h2>
          <p className="text-lg text-ink-dark">
            You've redeemed <span className="font-semibold">{result.reward.name}</span>
          </p>
        </div>

        {/* Redemption token */}
        <div className="bg-pastel-cream border-2 border-pastel-lavender rounded-lg p-4 mb-4">
          <p className="text-sm text-ink-medium mb-2 text-center">
            Your Redemption Token:
          </p>
          <div className="bg-white rounded px-4 py-3 font-mono text-center text-lg font-bold text-pastel-lavender break-all">
            {result.token}
          </div>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="w-full py-3 px-4 bg-pastel-lavender hover:bg-purple-300 text-ink-dark rounded-lg font-medium transition-all mb-3"
        >
          {copied ? '✓ Copied!' : 'Copy Token'}
        </button>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
          <p className="mb-2">
            <strong>What's next?</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Save this token</li>
            <li>Use it to claim your reward</li>
            <li>Keep building your streak!</li>
          </ul>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RedemptionModal;
