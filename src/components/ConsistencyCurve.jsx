/**
 * ConsistencyCurve.jsx
 * Line chart showing non-linear reward curve
 */

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useHabit } from '../context/HabitContext';
import { getLast7Days, isSameDay, formatShortDate } from '../utils/dateHelpers';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ConsistencyCurve = () => {
  const { state } = useHabit();

  // Get last 7 days
  const last7Days = getLast7Days();

  // Map taskHistory to chart data
  const chartData = last7Days.map(day => {
    // Find all completions on this day
    const dayHistory = state.taskHistory.filter(entry =>
      isSameDay(new Date(entry.date), new Date(day))
    );

    // Sum points for the day
    return dayHistory.reduce((sum, entry) => sum + entry.pointsAwarded, 0);
  });

  const data = {
    labels: last7Days.map(day => formatShortDate(day)),
    datasets: [
      {
        label: 'Daily Points',
        data: chartData,
        borderColor: '#D4C5F9',
        backgroundColor: 'rgba(212, 197, 249, 0.2)',
        fill: true,
        tension: 0.4, // Smooth curve
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#D4C5F9',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Your Consistency Curve (Last 7 Days)',
        font: {
          size: 18,
          family: 'Poppins',
          weight: 'bold',
        },
        color: '#2C3E50',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} points`,
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          family: 'Poppins',
        },
        bodyFont: {
          size: 13,
          family: 'Poppins',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}`,
          font: {
            family: 'Poppins',
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        ticks: {
          font: {
            family: 'Poppins',
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  };

  const hasData = chartData.some(value => value > 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-80">
      {hasData ? (
        <Line data={data} options={options} />
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-gray-400">
          <div className="text-6xl mb-4">📈</div>
          <p className="text-center">
            Complete tasks to see your consistency curve!
          </p>
          <p className="text-sm text-center mt-2">
            The curve will show how the √Streak formula rewards consistency
          </p>
        </div>
      )}
    </div>
  );
};

export default ConsistencyCurve;
