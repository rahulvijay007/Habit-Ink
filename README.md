# Habit Ink 🖊️

### Adaptive Consistency Reinforcement Platform

**Transform habit formation through behavioral science and adaptive rewards**

![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)

---

## 📋 Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [The √Streak Algorithm](#the-streak-algorithm)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Habit Ink is a gamified habit tracking application that uses an **adaptive reward algorithm** based on behavioral science principles. Unlike traditional habit trackers that use fixed, linear rewards, Habit Ink implements a **non-linear √Streak formula** that creates Variable Ratio Reinforcement - proven to be more effective for long-term habit formation.

### Why "Habit Ink"?

The stationery theme represents the **permanence and tangibility** of habits. Just as ink makes lasting marks on paper, consistent habits create lasting change in our lives.

---

## 🚨 The Problem

Traditional habit tracking apps fail for 3 key reasons:

1. **Linear Rewards**: Fixed points per completion cause motivation decay
2. **Extrinsic Focus**: External rewards can reduce intrinsic motivation (over-justification effect)
3. **All-or-Nothing**: Breaking streaks causes guilt and abandonment

**Result**: 80% of users abandon habit trackers within 30 days.

---

## ✨ The Solution

Habit Ink solves these problems using:

### 1. Adaptive √Streak Algorithm

```
Points = (10 × Tasks Completed) + (2.5 × √Current Streak)
```

- **Early days**: Rapid reward growth creates excitement
- **Mid-term**: Predictable pattern builds consistency
- **Long-term**: Sustainable reinforcement prevents burnout

### 2. Variable Ratio Reinforcement

Based on B.F. Skinner's operant conditioning research, variable rewards maintain engagement better than fixed schedules.

### 3. Flexible Streaks

- Missing a day only resets the streak bonus, not all points
- Low-stakes approach reduces anxiety
- Focus on consistency, not perfection

---

## 🚀 Key Features

### Core Features

- ✅ **Task Management**: Create up to 5 tasks with hashtag categorization
- ✅ **Smart Lockout**: 24-hour cooldown prevents gaming the system
- ✅ **Adaptive Rewards**: √Streak formula for optimal motivation
- ✅ **7-Day Visualization**: Chart.js graph showing consistency curve
- ✅ **Rewards Catalog**: Redeem stationery-themed rewards with points
- ✅ **Point History**: Track all completions with detailed breakdown
- ✅ **Milestone Celebrations**: Special bonuses at 7, 14, 30, 60, 100 days
- ✅ **Responsive Design**: Works beautifully on mobile and desktop

### Advanced Features

- 🔔 **Toast Notifications**: Professional feedback system
- 📊 **Enhanced Analytics**: Weekly/monthly chart views
- 🏷️ **Hashtag Filtering**: Organize tasks by category
- ⌨️ **Keyboard Shortcuts**: Power user features
- 💾 **Data Export/Import**: JSON and CSV export
- 🎨 **Stationery Theme**: Cohesive pastel aesthetic

---

## 🛠️ Tech Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | React | 18.3 | UI library |
| **Build Tool** | Vite | 5.0 | Fast dev server & bundling |
| **Styling** | Tailwind CSS | 3.4 | Utility-first CSS |
| **Charts** | Chart.js | 4.4 | Data visualization |
| | react-chartjs-2 | 5.2 | React wrapper for Chart.js |
| **Date Utils** | date-fns | 3.0 | Date manipulation |
| **Notifications** | react-hot-toast | 2.6 | Toast notifications |
| **Storage** | localStorage | - | Client-side persistence |

---

## 📦 Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. **Clone the repository** (or navigate to project directory)

```bash
cd "D:\Rahul Vijayraghavan\Tech Events\Habit Ink"
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open in browser**

Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

---

## 🧮 The √Streak Algorithm

### Mathematical Foundation

The core innovation of Habit Ink is the **square root scaling** of streak bonuses:

```javascript
Points = (10 × Tasks Completed) + (2.5 × √Current Streak)
```

### Why Square Root?

We tested three scaling approaches:

| Approach | Day 1 | Day 30 | Day 100 | Problem |
|----------|-------|--------|---------|---------|
| **Linear** | 12.5 | 85 | 260 | Unrealistic expectations |
| **Exponential** | 11 | 174 | 137,800 | Unsustainable inflation |
| **Square Root** | 12.5 | 23.7 | 35 | ✅ Balanced growth |

### Example Progression

| Day | Streak | Base | Bonus | Total | Growth |
|-----|--------|------|-------|-------|--------|
| 1 | 1 | 10 | 2.5 | **12.5** | - |
| 2 | 2 | 10 | 3.5 | **13.5** | +8% |
| 5 | 5 | 10 | 5.6 | **15.6** | +25% |
| 7 | 7 | 10 | 6.6 | **16.6** | +33% |
| 14 | 14 | 10 | 9.4 | **19.4** | +55% |
| 30 | 30 | 10 | 13.7 | **23.7** | +90% |
| 100 | 100 | 10 | 25.0 | **35.0** | +180% |

### Behavioral Science

This formula implements **Variable Ratio Reinforcement**:

- **Variable**: Rewards grow unpredictably from user's perspective
- **Ratio**: Based on consistent behavior (task completion)
- **Reinforcement**: Positive feedback maintains habit

**Research basis**: Skinner (1953), Nir Eyal's "Hooked" (2014)

---

## 📁 Project Structure

```
D:/Rahul Vijayraghavan/Tech Events/Habit Ink/
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx              # Top navigation
│   │   ├── TaskList.jsx            # Task container
│   │   ├── TaskCard.jsx            # Individual task
│   │   ├── AddTaskForm.jsx         # Task creation
│   │   ├── StatsPanel.jsx          # Statistics display
│   │   ├── ConsistencyCurve.jsx    # Chart visualization
│   │   ├── RewardsCatalog.jsx      # Rewards grid
│   │   ├── RewardCard.jsx          # Individual reward
│   │   └── RedemptionModal.jsx     # Success modal
│   │
│   ├── context/             # State management
│   │   └── HabitContext.jsx        # Global state
│   │
│   ├── engine/              # Core business logic
│   │   ├── AlgorithmEngine.js      # √Streak formula
│   │   └── StorageService.js       # localStorage wrapper
│   │
│   ├── utils/               # Helper functions
│   │   ├── constants.js            # Config values
│   │   ├── dateHelpers.js          # Date utilities
│   │   ├── validators.js           # Input validation
│   │   ├── toastConfig.js          # Toast notifications
│   │   └── demoDataSeeder.js       # Demo data generator
│   │
│   ├── data/                # Static data
│   │   └── initialRewards.js       # Rewards catalog
│   │
│   ├── App.jsx              # Main component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
│
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind theme
├── README.md                # This file
└── presentation.md          # Presentation guide

```

### Key Files

| File | Purpose | Lines | Importance |
|------|---------|-------|------------|
| `AlgorithmEngine.js` | Core √Streak formula | 90 | ⭐⭐⭐ Critical |
| `HabitContext.jsx` | State management | 200 | ⭐⭐⭐ Critical |
| `TaskCard.jsx` | Task interaction | 100 | ⭐⭐⭐ Critical |
| `ConsistencyCurve.jsx` | Chart visualization | 120 | ⭐⭐ High |
| `StorageService.js` | Data persistence | 70 | ⭐⭐ High |

---

## 📖 Usage Guide

### Adding a Task

1. Click "**Add New Task**" button
2. Enter task name (e.g., "Study Physics for 30 min")
3. Add hashtags for categorization: `#Physics #Study`
4. Click "**Add Task**"

**Limit**: Maximum 5 active tasks to maintain focus

### Completing a Task

1. Click "**Daily Done ✓**" button on any task
2. View points awarded based on your current streak
3. See your streak increment
4. Watch the consistency curve update

**Lockout**: Each task has a 24-hour cooldown to prevent gaming

### Redeeming Rewards

1. Browse the **Rewards Catalog** (right column)
2. When you have enough points, click "**Redeem**"
3. Confirm your redemption
4. Receive a unique redemption token
5. Save your token for claiming the reward

### Viewing History

1. Click "**View History**" in the Stats Panel
2. Filter by date range or task
3. Sort by date or points
4. Export as CSV for analysis

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + N` | Add new task |
| `Ctrl/Cmd + K` | Show shortcuts help |
| `Ctrl/Cmd + E` | Export data |
| `Ctrl/Cmd + H` | View history |
| `Escape` | Close modals |

---

## 🔧 Development

### Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (port 5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

### Configuration

**Tailwind Theme** (`tailwind.config.js`):
```javascript
colors: {
  'pastel-mint': '#B8E6D5',
  'pastel-lavender': '#D4C5F9',
  'pastel-cream': '#FFF8E7',
  'pastel-peach': '#FFDAC1',
  'pastel-blue': '#C9E4F2',
  'ink-dark': '#2C3E50',
  'ink-medium': '#5D6D7E',
}
```

**Constants** (`src/utils/constants.js`):
```javascript
MAX_TASKS = 5          // Maximum active tasks
LOCKOUT_HOURS = 24     // Hours between completions
CHART_DAYS = 7         // Days shown in chart
```

### Data Model

**localStorage key**: `habitInkData`

**Data structure**:
```javascript
{
  totalPoints: number,
  currentStreak: number,
  lastCompletionDate: string (ISO),
  tasks: Array<{
    id: string,
    name: string,
    tags: string[],
    createdAt: string (ISO),
    lastCompleted: string (ISO) | null
  }>,
  taskHistory: Array<{
    date: string (ISO),
    pointsAwarded: number,
    tasksCompleted: number,
    taskId: string,
    taskName: string
  }>,
  rewardsCatalog: Array<{
    id: string,
    name: string,
    description: string,
    cost: number,
    code: string,
    icon: string
  }>,
  redeemedRewards: Array<{
    rewardId: string,
    rewardName: string,
    token: string,
    redeemedAt: string (ISO)
  }>,
  achievedMilestones: Array<{
    milestone: number,
    achievedAt: string (ISO),
    bonus: number
  }>
}
```

---

## 🎨 Design Philosophy

### Visual Theme

**Stationery Aesthetic**: Soft pastel colors evoke the tactile nature of physical stationery, connecting digital habits to tangible rewards.

**Typography**:
- **Poppins**: Clean, modern sans-serif for body text
- **Caveat**: Handwriting font for decorative elements

**Color Psychology**:
- **Mint**: Calm, growth, freshness
- **Lavender**: Relaxation, mindfulness
- **Cream**: Warmth, comfort
- **Peach**: Energy, optimism

### UX Principles

1. **Immediate Feedback**: Toast notifications and animations
2. **Progressive Disclosure**: Expandable forms, collapsible panels
3. **Error Prevention**: Validation, lockouts, limits
4. **Consistency**: Predictable patterns throughout
5. **Accessibility**: High contrast, clear labels, keyboard support

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Task creation with and without hashtags
- [ ] Task completion awards correct points
- [ ] 24-hour lockout enforces properly
- [ ] Streak increments on consecutive days
- [ ] Streak resets after missing days
- [ ] Chart displays last 7 days correctly
- [ ] Rewards can be redeemed with sufficient points
- [ ] Redemption token generates correctly
- [ ] Data persists across page refreshes
- [ ] All features work on mobile
- [ ] No console errors

### Algorithm Verification

Test the formula manually:

```javascript
// Day 1, Streak 1:
10 + (2.5 × √1) = 10 + 2.5 = 12.5 ≈ 13 points ✓

// Day 7, Streak 7:
10 + (2.5 × √7) = 10 + 6.6 = 16.6 ≈ 17 points ✓

// Day 30, Streak 30:
10 + (2.5 × √30) = 10 + 13.7 = 23.7 ≈ 24 points ✓
```

---

## 🚀 Future Roadmap

### Phase 1: Mobile App
- React Native implementation
- Offline-first architecture
- Push notifications

### Phase 2: Social Features
- Optional accountability partners
- Community challenges
- Leaderboards

### Phase 3: Advanced Analytics
- Machine learning habit insights
- Optimal completion time suggestions
- Personalized reward recommendations

### Phase 4: Integrations
- Calendar sync (Google, Apple)
- Fitness tracker integration
- Productivity tool connections

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use functional components with hooks
- Follow existing naming conventions
- Comment complex logic
- Keep components under 200 lines
- Use Tailwind classes (avoid inline styles)

---

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 👤 Author

**Rahul Vijayraghavan**

- Built for Tech Events Hackathon
- Demonstrates full-stack development, behavioral science, and UX design

---

## 🙏 Acknowledgments

- **B.F. Skinner** - Operant conditioning research
- **Nir Eyal** - Hooked: How to Build Habit-Forming Products
- **James Clear** - Atomic Habits methodology
- **Tailwind Labs** - Amazing CSS framework
- **Chart.js Team** - Beautiful data visualization

---

## 📚 References

1. Skinner, B.F. (1953). *Science and Human Behavior*
2. Eyal, N. (2014). *Hooked: How to Build Habit-Forming Products*
3. Clear, J. (2018). *Atomic Habits*
4. Deci, E.L., & Ryan, R.M. (1985). *Intrinsic Motivation and Self-Determination*

---

**Made with ❤️ and lots of ☕ for sustainable habit formation**

*"We are what we repeatedly do. Excellence, then, is not an act, but a habit." - Aristotle*
