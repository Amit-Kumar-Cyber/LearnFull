import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Trophy,
  Medal,
  TrendingUp,
  TrendingDown,
  Flame,
  Star,
  Award,
  Target,
} from 'lucide-react';

export function LeaderboardView() {
  const [timeFilter, setTimeFilter] = useState('week');

  const leaderboardData = [
    {
      rank: 1,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      points: 2850,
      courses: 12,
      streak: 28,
      change: 0,
      badges: 15,
      level: 'Expert',
    },
    {
      rank: 2,
      name: 'Michael Chen',
      avatar: 'MC',
      points: 2720,
      courses: 10,
      streak: 21,
      change: 1,
      badges: 12,
      level: 'Advanced',
    },
    {
      rank: 3,
      name: 'Emma Wilson',
      avatar: 'EW',
      points: 2680,
      courses: 11,
      streak: 18,
      change: -1,
      badges: 14,
      level: 'Expert',
    },
    {
      rank: 4,
      name: 'James Rodriguez',
      avatar: 'JR',
      points: 2540,
      courses: 9,
      streak: 15,
      change: 2,
      badges: 10,
      level: 'Advanced',
    },
    {
      rank: 5,
      name: 'Olivia Taylor',
      avatar: 'OT',
      points: 2490,
      courses: 8,
      streak: 20,
      change: -1,
      badges: 11,
      level: 'Advanced',
    },
    {
      rank: 6,
      name: 'David Kim',
      avatar: 'DK',
      points: 2380,
      courses: 10,
      streak: 12,
      change: 0,
      badges: 9,
      level: 'Intermediate',
    },
    {
      rank: 7,
      name: 'Sophia Martinez',
      avatar: 'SM',
      points: 2320,
      courses: 7,
      streak: 14,
      change: 3,
      badges: 8,
      level: 'Intermediate',
    },
    {
      rank: 8,
      name: 'Daniel Brown',
      avatar: 'DB',
      points: 2280,
      courses: 9,
      streak: 10,
      change: -2,
      badges: 10,
      level: 'Intermediate',
    },
    {
      rank: 9,
      name: 'Isabella Garcia',
      avatar: 'IG',
      points: 2250,
      courses: 8,
      streak: 16,
      change: 1,
      badges: 7,
      level: 'Intermediate',
    },
    {
      rank: 10,
      name: 'William Davis',
      avatar: 'WD',
      points: 2180,
      courses: 6,
      streak: 9,
      change: -1,
      badges: 6,
      level: 'Intermediate',
    },
    {
      rank: 11,
      name: 'Ava Anderson',
      avatar: 'AA',
      points: 2150,
      courses: 7,
      streak: 11,
      change: 0,
      badges: 8,
      level: 'Intermediate',
    },
    {
      rank: 12,
      name: 'Ethan Thomas',
      avatar: 'ET',
      points: 2100,
      courses: 6,
      streak: 8,
      change: 2,
      badges: 5,
      level: 'Beginner',
    },
    {
      rank: 13,
      name: 'Mia Robinson',
      avatar: 'MR',
      points: 2050,
      courses: 5,
      streak: 13,
      change: -3,
      badges: 7,
      level: 'Beginner',
    },
    {
      rank: 14,
      name: 'You',
      avatar: 'V',
      points: 2020,
      courses: 5,
      streak: 5,
      change: 0,
      badges: 4,
      level: 'Beginner',
      isCurrentUser: true,
    },
    {
      rank: 15,
      name: 'Alexander Lee',
      avatar: 'AL',
      points: 1980,
      courses: 4,
      streak: 7,
      change: 1,
      badges: 5,
      level: 'Beginner',
    },
  ];

  const achievements = [
    { name: 'Speed Learner', icon: '⚡', description: 'Complete 5 courses in a month', unlocked: true },
    { name: 'Perfect Score', icon: '💯', description: 'Get 100% on any test', unlocked: true },
    { name: 'Week Warrior', icon: '🔥', description: 'Maintain a 7-day streak', unlocked: true },
    { name: 'Knowledge Seeker', icon: '📚', description: 'Complete 10 courses', unlocked: false },
    { name: 'Top Performer', icon: '🏆', description: 'Reach top 10 on leaderboard', unlocked: false },
    { name: 'Marathon Runner', icon: '🎯', description: '30-day learning streak', unlocked: false },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500 fill-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400 fill-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600 fill-orange-600" />;
      default:
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Advanced':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Intermediate':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Beginner':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
        <p className="text-gray-400">Compete with other learners and track your progress</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Leaderboard */}
        <div className="lg:col-span-2 space-y-6">
          {/* Time Filter */}
          <div className="flex gap-3">
            <button
              onClick={() => setTimeFilter('week')}
              className={`px-5 py-2 rounded-xl transition-all ${
                timeFilter === 'week'
                  ? 'bg-[#5B5FFF] text-white'
                  : 'bg-[#1A1A2E] text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeFilter('month')}
              className={`px-5 py-2 rounded-xl transition-all ${
                timeFilter === 'month'
                  ? 'bg-[#5B5FFF] text-white'
                  : 'bg-[#1A1A2E] text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-5 py-2 rounded-xl transition-all ${
                timeFilter === 'all'
                  ? 'bg-[#5B5FFF] text-white'
                  : 'bg-[#1A1A2E] text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              All Time
            </button>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* 2nd Place */}
            <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10 flex flex-col items-center mt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                {leaderboardData[1].avatar}
              </div>
              <Medal className="w-8 h-8 text-gray-400 fill-gray-400 mb-2" />
              <h3 className="font-semibold text-white text-center mb-1">{leaderboardData[1].name}</h3>
              <p className="text-2xl font-bold text-white mb-1">{leaderboardData[1].points}</p>
              <p className="text-xs text-gray-400">points</p>
            </div>

            {/* 1st Place */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-5 border-2 border-yellow-500/50 flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3">
                {leaderboardData[0].avatar}
              </div>
              <Trophy className="w-10 h-10 text-yellow-500 fill-yellow-500 mb-2" />
              <h3 className="font-semibold text-white text-center mb-1">{leaderboardData[0].name}</h3>
              <p className="text-3xl font-bold text-white mb-1">{leaderboardData[0].points}</p>
              <p className="text-xs text-gray-400">points</p>
            </div>

            {/* 3rd Place */}
            <div className="bg-[#1A1A2E] rounded-2xl p-5 border border-white/10 flex flex-col items-center mt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                {leaderboardData[2].avatar}
              </div>
              <Medal className="w-8 h-8 text-orange-600 fill-orange-600 mb-2" />
              <h3 className="font-semibold text-white text-center mb-1">{leaderboardData[2].name}</h3>
              <p className="text-2xl font-bold text-white mb-1">{leaderboardData[2].points}</p>
              <p className="text-xs text-gray-400">points</p>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-[#1A1A2E] rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Rank</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">User</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Points</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Courses</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Streak</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Change</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user) => (
                  <tr
                    key={user.rank}
                    className={`border-b border-white/5 transition-colors ${
                      user.isCurrentUser
                        ? 'bg-[#5B5FFF]/10 hover:bg-[#5B5FFF]/20'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center justify-center w-10">
                        {getRankIcon(user.rank)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                          user.isCurrentUser
                            ? 'bg-gradient-to-br from-[#5B5FFF] to-[#7B61FF]'
                            : 'bg-gradient-to-br from-gray-600 to-gray-700'
                        }`}>
                          {user.avatar}
                        </div>
                        <div>
                          <div className={`font-medium ${user.isCurrentUser ? 'text-[#5B5FFF]' : 'text-white'}`}>
                            {user.name}
                          </div>
                          <Badge className={`${getLevelColor(user.level)} text-xs mt-1`}>
                            {user.level}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-white">{user.points}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{user.courses}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-white font-medium">{user.streak}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {user.change > 0 ? (
                        <div className="flex items-center gap-1 text-[#4ECB71]">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-medium">+{user.change}</span>
                        </div>
                      ) : user.change < 0 ? (
                        <div className="flex items-center gap-1 text-[#FF6B6B]">
                          <TrendingDown className="w-4 h-4" />
                          <span className="font-medium">{user.change}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Stats & Achievements */}
        <div className="space-y-6">
          {/* Your Stats */}
          <div className="bg-[#1A1A2E] rounded-2xl p-6 border border-white/10">
            <h3 className="font-semibold text-white mb-4">Your Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Current Rank</span>
                <span className="text-2xl font-bold text-white">#14</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Total Points</span>
                <span className="text-xl font-bold text-[#5B5FFF]">2,020</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Current Streak</span>
                <div className="flex items-center gap-1">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-xl font-bold text-white">5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Badges Earned</span>
                <span className="text-xl font-bold text-yellow-500">4</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-xs text-gray-400 mb-2">Points to next rank</div>
              <Progress value={65} className="h-2 mb-2" />
              <div className="text-xs text-gray-400">30 points needed</div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-[#1A1A2E] rounded-2xl p-6 border border-white/10">
            <h3 className="font-semibold text-white mb-4">Achievements</h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl border ${
                    achievement.unlocked
                      ? 'bg-[#5B5FFF]/10 border-[#5B5FFF]/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                        {achievement.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{achievement.description}</div>
                    </div>
                    {achievement.unlocked && (
                      <Award className="w-4 h-4 text-[#5B5FFF]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
