import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { 
  MapPin, 
  Building, 
  Target, 
  Package, 
  ShoppingCart, 
  Users, 
  Sword, 
  Trophy,
  TrendingUp,
  Activity,
  Calendar,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  const dailyTasks = [
    { id: 1, name: 'Work in your company', completed: true, reward: 50 },
    { id: 2, name: 'Train at training grounds', completed: false, reward: 30 },
    { id: 3, name: 'Eat food for wellness', completed: false, reward: 25 },
    { id: 4, name: 'Vote in elections', completed: false, reward: 100 }
  ];

  const quickStats = [
    { label: 'Strength', value: 1250, max: 2000, icon: Target, color: 'bg-red-500' },
    { label: 'Experience', value: 850, max: 1000, icon: Trophy, color: 'bg-blue-500' },
    { label: 'Wellness', value: 75, max: 100, icon: Activity, color: 'bg-green-500' }
  ];

  const recentActivity = [
    { action: 'Defeated enemy in battle', time: '2 hours ago', type: 'combat' },
    { action: 'Completed work shift', time: '4 hours ago', type: 'work' },
    { action: 'Joined military unit', time: '1 day ago', type: 'social' },
    { action: 'Purchased new equipment', time: '2 days ago', type: 'market' }
  ];

  const activeWars = [
    { attacker: 'Germany', defender: 'France', region: 'Alsace-Lorraine', progress: 65 },
    { attacker: 'Italy', defender: 'Switzerland', region: 'Ticino', progress: 30 },
    { attacker: 'Spain', defender: 'Portugal', region: 'Porto', progress: 80 }
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-6">
      <div className="container mx-auto px-4 space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
              <p className="text-blue-100 mt-2">Ready to lead {user.country} to victory?</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Level {user.level}</div>
              <div className="text-2xl font-bold">{user.country}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: Building, label: 'Company', path: '/my-places/company', color: 'from-blue-500 to-blue-600' },
            { icon: Target, label: 'Training', path: '/my-places/training', color: 'from-red-500 to-red-600' },
            { icon: ShoppingCart, label: 'Market', path: '/market/marketplace', color: 'from-green-500 to-green-600' },
            { icon: Users, label: 'Military Unit', path: '/community/military-unit', color: 'from-purple-500 to-purple-600' },
            { icon: Sword, label: 'Wars', path: '/wars', color: 'from-orange-500 to-orange-600' }
          ].map((action, index) => (
            <Link key={index} to={action.path}>
              <Card className={`p-4 bg-gradient-to-br ${action.color} hover:scale-105 transition-transform cursor-pointer border-none`}>
                <div className="text-center text-white">
                  <action.icon className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">{action.label}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Daily Tasks */}
          <Card className="bg-slate-800 border-slate-700">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Daily Tasks
              </h2>
              <div className="space-y-3">
                {dailyTasks.map((task) => (
                  <div key={task.id} className={`p-3 rounded-lg border ${
                    task.completed 
                      ? 'bg-green-500/20 border-green-500/50' 
                      : 'bg-slate-700 border-slate-600'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${
                        task.completed ? 'text-green-400' : 'text-white'
                      }`}>
                        {task.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-400 text-sm">+{task.reward}</span>
                        {task.completed ? (
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        ) : (
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                            Do
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Stats */}
          <Card className="bg-slate-800 border-slate-700">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Your Stats
              </h2>
              <div className="space-y-4">
                {quickStats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 ${stat.color} rounded`}></div>
                        <span className="text-white font-medium">{stat.label}</span>
                      </div>
                      <span className="text-slate-300">{stat.value}/{stat.max}</span>
                    </div>
                    <Progress value={(stat.value / stat.max) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-slate-800 border-slate-700">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Recent Activity
              </h2>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-700">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'combat' ? 'bg-red-500' :
                      activity.type === 'work' ? 'bg-blue-500' :
                      activity.type === 'social' ? 'bg-purple-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-slate-400 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Active Wars */}
        <Card className="bg-slate-800 border-slate-700">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Sword className="w-5 h-5 mr-2" />
              Active Wars
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {activeWars.map((war, index) => (
                <div key={index} className="p-4 rounded-lg bg-slate-700 border border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-red-400 font-medium">{war.attacker}</span>
                    <Sword className="w-4 h-4 text-slate-400" />
                    <span className="text-blue-400 font-medium">{war.defender}</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">Battle for {war.region}</p>
                  <Progress value={war.progress} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{war.attacker} {war.progress}%</span>
                    <span>{war.defender} {100 - war.progress}%</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full mt-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  >
                    Join Battle
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;