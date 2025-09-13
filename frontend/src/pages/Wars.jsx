import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { 
  Sword, 
  Shield, 
  Target, 
  Map,
  Clock,
  Users,
  Trophy,
  Flame,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { warsAPI } from '../utils/api';
import { toast } from 'sonner';

const Wars = ({ user }) => {
  const [activeWars, setActiveWars] = useState([]);
  const [userStats, setUserStats] = useState({
    totalDamage: 0,
    battlesWon: 0,
    battlesLost: 0,
    rank: 'Private',
    medals: 0,
    currentStrength: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWarsData();
    fetchUserStats();
  }, []);

  const fetchWarsData = async () => {
    try {
      const response = await warsAPI.getAll();
      setActiveWars(response.data);
    } catch (error) {
      console.error('Error fetching wars:', error);
      toast.error('Failed to load wars data');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await warsAPI.getUserStats();
      setUserStats(response.data);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleFight = async (warId, side) => {
    try {
      const response = await warsAPI.fight(warId, side);
      toast.success(response.data.message);
      
      // Refresh data
      await fetchWarsData();
      await fetchUserStats();
    } catch (error) {
      console.error('Error fighting in war:', error);
      const errorMessage = error.response?.data?.detail || 'Failed to join battle';
      toast.error(errorMessage);
    }
  };

  const getWarStatus = (war) => {
    const attackerPercentage = (war.attackerDamage / war.totalDamage) * 100;
    if (attackerPercentage > 70) return { status: 'overwhelming', color: 'bg-red-500', textColor: 'text-red-400' };
    if (attackerPercentage > 55) return { status: 'advantage', color: 'bg-orange-500', textColor: 'text-orange-400' };
    if (attackerPercentage > 45) return { status: 'balanced', color: 'bg-yellow-500', textColor: 'text-yellow-400' };
    return { status: 'defensive', color: 'bg-blue-500', textColor: 'text-blue-400' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 pt-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-xl">Loading wars...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-6">
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Sword className="w-8 h-8 mr-3 text-red-400" />
            Wars
          </h1>
          <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
            {activeWars.length} Active Conflicts
          </Badge>
        </div>

        {/* User War Stats */}
        <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Your Battle Statistics
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-slate-700/50">
                <Target className="w-6 h-6 mx-auto mb-2 text-red-400" />
                <div className="text-2xl font-bold text-white">{userStats.totalDamage.toLocaleString()}</div>
                <p className="text-slate-300 text-sm">Total Damage</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-700/50">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold text-white">{userStats.battlesWon}</div>
                <p className="text-slate-300 text-sm">Battles Won</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-700/50">
                <Zap className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold text-white">{userStats.currentStrength}</div>
                <p className="text-slate-300 text-sm">Strength</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-700/50">
                <Flame className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold text-white">{userStats.rank}</div>
                <p className="text-slate-300 text-sm">Military Rank</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Wars */}
        <div className="space-y-6">
          {activeWars.map((war) => {
            const warStatus = getWarStatus(war);
            const attackerPercentage = Math.round((war.attackerDamage / war.totalDamage) * 100);
            const defenderPercentage = 100 - attackerPercentage;

            return (
              <Card key={war.id} className="bg-slate-800 border-slate-700 overflow-hidden">
                <div className="p-6">
                  {/* War Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{war.attackerFlag}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{war.attacker} vs {war.defender}</h3>
                        <p className="text-slate-300 flex items-center">
                          <Map className="w-4 h-4 mr-1" />
                          Battle for {war.region}
                        </p>
                      </div>
                      <div className="text-4xl">{war.defenderFlag}</div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${warStatus.color}/20 ${warStatus.textColor} border ${warStatus.color}/50`}>
                        {war.status}
                      </div>
                      <p className="text-slate-400 text-sm mt-1 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {war.timeLeft} left
                      </p>
                    </div>
                  </div>

                  {/* Battle Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-red-400 font-semibold">{war.attacker} {attackerPercentage}%</span>
                      <span className="text-blue-400 font-semibold">{war.defender} {defenderPercentage}%</span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={attackerPercentage} 
                        className="h-4"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sword className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* War Stats */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-slate-700 border border-slate-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-300 text-sm">Total Damage</p>
                          <p className="text-xl font-bold text-white">{war.totalDamage.toLocaleString()}</p>
                        </div>
                        <Target className="w-8 h-8 text-red-400" />
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-700 border border-slate-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-300 text-sm">Participants</p>
                          <p className="text-xl font-bold text-white">{war.participants}</p>
                        </div>
                        <Users className="w-8 h-8 text-blue-400" />
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-700 border border-slate-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-300 text-sm">Current Round</p>
                          <p className="text-xl font-bold text-white">{war.battleRounds.length}/11</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-yellow-400" />
                      </div>
                    </div>
                  </div>

                  {/* Battle Rounds */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Recent Battle Rounds</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {war.battleRounds.map((round, index) => (
                        <div 
                          key={round.round}
                          className={`p-3 rounded-lg text-center border ${
                            round.winner === 'attacker' 
                              ? 'bg-red-500/20 border-red-500/50' 
                              : 'bg-blue-500/20 border-blue-500/50'
                          }`}
                        >
                          <div className="text-xs text-slate-300">Round {round.round}</div>
                          <div className={`text-lg font-bold ${
                            round.winner === 'attacker' ? 'text-red-400' : 'text-blue-400'
                          }`}>
                            {round.winner === 'attacker' ? war.attackerFlag : war.defenderFlag}
                          </div>
                          <div className="text-xs text-slate-400">{(round.damage / 1000).toFixed(0)}k</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                      size="lg"
                      onClick={() => handleFight(war.id, 'attacker')}
                    >
                      <Sword className="w-4 h-4 mr-2" />
                      Fight for {war.attacker}
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      size="lg"
                      onClick={() => handleFight(war.id, 'defender')}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Defend {war.defender}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-red-600/20 to-blue-600/20 border-red-500/50">
          <div className="p-8 text-center">
            <Sword className="w-12 h-12 mx-auto mb-4 text-red-400" />
            <h3 className="text-2xl font-bold text-white mb-2">Join the Battle!</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Choose your side and fight for glory! Every battle shapes the future of Europa. 
              Gain experience, earn rewards, and become a legendary warrior.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              <Flame className="w-5 h-5 mr-2" />
              Enter Battlefield
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Wars;