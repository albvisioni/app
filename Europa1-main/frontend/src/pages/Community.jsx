import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  Shield, 
  Users2, 
  Crown, 
  Medal,
  MessageSquare,
  Calendar,
  Target,
  Trophy,
  Users,
  Plus,
  Vote
} from 'lucide-react';

const Community = ({ user }) => {
  const MilitaryUnitPage = () => {
    const [militaryUnit, setMilitaryUnit] = useState({
      name: 'European Elite Forces',
      leader: 'GeneralCommander',
      members: 145,
      maxMembers: 200,
      level: 8,
      battles: 23,
      victories: 18,
      motto: 'Unity through Strength'
    });

    const [members, setMembers] = useState([
      { id: 1, name: 'GeneralCommander', rank: 'Commander', damage: 15420, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
      { id: 2, name: 'CaptainSteel', rank: 'Captain', damage: 12890, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
      { id: 3, name: 'LieutenantFire', rank: 'Lieutenant', damage: 9650, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c1c9?w=40&h=40&fit=crop&crop=face' },
      { id: 4, name: 'SergeantIron', rank: 'Sergeant', damage: 7830, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face' },
      { id: 5, name: user.name, rank: 'Private', damage: 5240, avatar: user.avatar }
    ]);

    const [activeBattles, setActiveBattles] = useState([
      { id: 1, location: 'Berlin Front', enemy: 'Red Army Unit', progress: 65, urgency: 'high' },
      { id: 2, location: 'Paris Defense', enemy: 'Legion Forces', progress: 40, urgency: 'medium' },
      { id: 3, location: 'Rome Siege', enemy: 'Imperial Guard', progress: 80, urgency: 'low' }
    ]);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Military Unit</h1>
          <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Recruit
          </Button>
        </div>

        {/* Unit Overview */}
        <Card className="bg-slate-800 border-slate-700">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{militaryUnit.name}</h2>
                <p className="text-slate-300 italic">"{militaryUnit.motto}"</p>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 text-2xl font-bold">Level {militaryUnit.level}</div>
                <p className="text-slate-400">Military Unit</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 rounded-lg bg-slate-700">
                <Users className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <div className="text-xl font-bold text-white">{militaryUnit.members}</div>
                <p className="text-slate-300 text-sm">Members</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-700">
                <Target className="w-6 h-6 mx-auto mb-2 text-red-400" />
                <div className="text-xl font-bold text-white">{militaryUnit.battles}</div>
                <p className="text-slate-300 text-sm">Battles</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-700">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <div className="text-xl font-bold text-white">{militaryUnit.victories}</div>
                <p className="text-slate-300 text-sm">Victories</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-700">
                <Medal className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <div className="text-xl font-bold text-white">{Math.round((militaryUnit.victories / militaryUnit.battles) * 100)}%</div>
                <p className="text-slate-300 text-sm">Win Rate</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Unit Capacity</span>
                <span className="text-white">{militaryUnit.members}/{militaryUnit.maxMembers}</span>
              </div>
              <Progress value={(militaryUnit.members / militaryUnit.maxMembers) * 100} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Active Battles */}
        <Card className="bg-slate-800 border-slate-700">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Active Battles
            </h2>
            <div className="space-y-3">
              {activeBattles.map((battle) => (
                <div key={battle.id} className="p-4 rounded-lg bg-slate-700 border border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white">{battle.location}</h3>
                      <p className="text-slate-300 text-sm">vs {battle.enemy}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      battle.urgency === 'high' ? 'bg-red-500/20 text-red-400' :
                      battle.urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {battle.urgency} priority
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Battle Progress</span>
                      <span className="text-white">{battle.progress}%</span>
                    </div>
                    <Progress value={battle.progress} className="h-2" />
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                    Join Battle
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Members */}
        <Card className="bg-slate-800 border-slate-700">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Crown className="w-5 h-5 mr-2" />
              Top Members
            </h2>
            <div className="space-y-3">
              {members.map((member, index) => (
                <div key={member.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-700 border border-slate-600">
                  <div className="flex items-center space-x-4">
                    <div className="text-slate-400 font-bold w-6">#{index + 1}</div>
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium">{member.name}</p>
                      <p className="text-slate-400 text-sm">{member.rank}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{member.damage.toLocaleString()}</p>
                    <p className="text-slate-400 text-sm">Total Damage</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const PartyPage = () => {
    const [party, setParty] = useState({
      name: 'Democratic Alliance',
      leader: 'PresidentLeader',
      members: 89,
      ideology: 'Centrist',
      founded: '2023-01-15',
      popularity: 67
    });

    const [elections, setElections] = useState([
      { id: 1, type: 'Presidential', candidate: 'PresidentLeader', votes: 1250, position: 1, status: 'leading' },
      { id: 2, type: 'Congressional', candidate: 'SenatorVoice', votes: 890, position: 3, status: 'competitive' },
      { id: 3, type: 'Regional', candidate: 'MayorLocal', votes: 450, position: 2, status: 'close' }
    ]);

    const [proposals, setProposals] = useState([
      { id: 1, title: 'Increase Defense Budget', author: 'DefenseMinister', votes: 45, status: 'active', timeLeft: '2 days' },
      { id: 2, title: 'Economic Reform Act', author: 'EconomyExpert', votes: 67, status: 'passed', timeLeft: 'completed' },
      { id: 3, title: 'Environmental Protection Bill', author: 'GreenAdvocate', votes: 23, status: 'active', timeLeft: '5 days' }
    ]);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">My Party</h1>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Vote className="w-4 h-4 mr-2" />
            Campaign
          </Button>
        </div>

        {/* Party Overview */}
        <Card className="bg-slate-800 border-slate-700">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{party.name}</h2>
                <p className="text-slate-300">{party.ideology} • Founded {new Date(party.founded).getFullYear()}</p>
              </div>
              <div className="text-right">
                <div className="text-blue-400 text-2xl font-bold">{party.popularity}%</div>
                <p className="text-slate-400">Popularity</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-slate-700">
                <Users2 className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <div className="text-xl font-bold text-white">{party.members}</div>
                <p className="text-slate-300 text-sm">Party Members</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-700">
                <Crown className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <div className="text-lg font-bold text-white">{party.leader}</div>
                <p className="text-slate-300 text-sm">Party Leader</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-700">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-green-400" />
                <div className="text-lg font-bold text-white">{new Date(party.founded).getFullYear()}</div>
                <p className="text-slate-300 text-sm">Founded</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Elections */}
        <Card className="bg-slate-800 border-slate-700">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Vote className="w-5 h-5 mr-2" />
              Active Elections
            </h2>
            <div className="space-y-3">
              {elections.map((election) => (
                <div key={election.id} className="p-4 rounded-lg bg-slate-700 border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-white">{election.type} Election</h3>
                      <p className="text-slate-300 text-sm">Candidate: {election.candidate}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      election.status === 'leading' ? 'bg-green-500/20 text-green-400' :
                      election.status === 'competitive' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      #{election.position} {election.status}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{election.votes.toLocaleString()} votes</span>
                    <Button size="sm">Support Candidate</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Party Proposals */}
        <Card className="bg-slate-800 border-slate-700">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Party Proposals
            </h2>
            <div className="space-y-3">
              {proposals.map((proposal) => (
                <div key={proposal.id} className="p-4 rounded-lg bg-slate-700 border border-slate-600">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white">{proposal.title}</h3>
                      <p className="text-slate-300 text-sm">by {proposal.author}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      proposal.status === 'passed' ? 'bg-green-500/20 text-green-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {proposal.status}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-white">{proposal.votes} votes</span>
                      <span className="text-slate-400 text-sm">• {proposal.timeLeft}</span>
                    </div>
                    {proposal.status === 'active' && (
                      <div className="space-x-2">
                        <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/20">
                          Against
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                          Support
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-6">
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/military-unit" element={<MilitaryUnitPage />} />
          <Route path="/party" element={<PartyPage />} />
          <Route path="/" element={<MilitaryUnitPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Community;