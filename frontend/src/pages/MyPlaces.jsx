import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Progress } from '../components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Building, 
  Target, 
  Package, 
  Plane, 
  Plus,
  Star,
  Users,
  Clock,
  MapPin,
  Coins,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const MyPlaces = ({ user }) => {
  const location = useLocation();

  const CompanyPage = () => {
    const [companies, setCompanies] = useState([
      { 
        id: 1, 
        name: 'Steel Factory Alpha', 
        type: 'Steel Production',
        level: 3,
        employees: 15,
        productivity: 85,
        revenue: 1250,
        location: 'Berlin'
      },
      {
        id: 2,
        name: 'Food Corp Beta',
        type: 'Food Production', 
        level: 2,
        employees: 8,
        productivity: 92,
        revenue: 850,
        location: 'Munich'
      }
    ]);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">My Companies</h1>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Company
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {companies.map((company) => (
            <Card key={company.id} className="bg-slate-800 border-slate-700">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{company.name}</h3>
                    <p className="text-slate-300">{company.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">{company.revenue} Gold</div>
                    <p className="text-slate-400 text-sm">Daily Revenue</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-slate-400 text-sm">Level</p>
                    <p className="text-white font-semibold">{company.level}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Employees</p>
                    <p className="text-white font-semibold">{company.employees}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">Productivity</span>
                    <span className="text-white">{company.productivity}%</span>
                  </div>
                  <Progress value={company.productivity} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm text-slate-300 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {company.location}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">Manage</Button>
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                    Upgrade
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          <Card className="bg-slate-800 border-slate-700 border-dashed">
            <div className="p-6 text-center">
              <Building className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Create New Company</h3>
              <p className="text-slate-300 mb-4">Build your economic empire</p>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                Get Started
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const TrainingPage = () => {
    const [trainingData, setTrainingData] = useState({
      strength: { level: 245, xp: 750, maxXp: 1000 },
      leadership: { level: 89, xp: 450, maxXp: 800 },
      charisma: { level: 156, xp: 300, maxXp: 600 }
    });

    const trainingOptions = [
      { name: 'Basic Training', cost: 10, strengthGain: 5, time: '1 hour' },
      { name: 'Advanced Training', cost: 25, strengthGain: 12, time: '2 hours' },
      { name: 'Elite Training', cost: 50, strengthGain: 25, time: '4 hours' }
    ];

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Training Grounds</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(trainingData).map(([skill, data], index) => (
            <Card key={skill} className="bg-slate-800 border-slate-700">
              <div className="p-6">
                <h3 className="text-lg font-bold text-white capitalize mb-4">{skill}</h3>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-400">{data.level}</div>
                  <p className="text-slate-300 text-sm">Current Level</p>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">Experience</span>
                    <span className="text-white">{data.xp}/{data.maxXp}</span>
                  </div>
                  <Progress value={(data.xp / data.maxXp) * 100} className="h-2" />
                </div>
                <Button size="sm" className="w-full">Train {skill}</Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Training Options</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {trainingOptions.map((option, index) => (
                <div key={index} className="p-4 rounded-lg bg-slate-700 border border-slate-600">
                  <h3 className="font-semibold text-white mb-2">{option.name}</h3>
                  <div className="space-y-1 text-sm text-slate-300 mb-4">
                    <p>Cost: {option.cost} Gold</p>
                    <p>Strength: +{option.strengthGain}</p>
                    <p>Duration: {option.time}</p>
                  </div>
                  <Button size="sm" className="w-full">Start Training</Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const StoragePage = () => {
    const [inventory, setInventory] = useState([
      { id: 1, name: 'Food', quantity: 45, type: 'consumable', icon: '🍖' },
      { id: 2, name: 'Weapons', quantity: 12, type: 'equipment', icon: '⚔️' },
      { id: 3, name: 'Steel', quantity: 150, type: 'resource', icon: '🔩' },
      { id: 4, name: 'Oil', quantity: 85, type: 'resource', icon: '🛢️' },
      { id: 5, name: 'Medical Kits', quantity: 8, type: 'consumable', icon: '🏥' }
    ]);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Storage</h1>
          <div className="text-slate-300">
            Capacity: {inventory.reduce((sum, item) => sum + item.quantity, 0)} / 500
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventory.map((item) => (
            <Card key={item.id} className="bg-slate-800 border-slate-700">
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-slate-400 text-sm capitalize">{item.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-400">{item.quantity}</span>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                      Use
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                      Sell
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          <Card className="bg-slate-800 border-slate-700 border-dashed">
            <div className="p-4 text-center">
              <Package className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-slate-300">Empty Slot</p>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const TravelPage = () => {
    const [currentLocation, setCurrentLocation] = useState('Berlin, Germany');
    const [destinations, setDestinations] = useState([
      { name: 'Paris, France', distance: 1050, cost: 25, time: '2 hours' },
      { name: 'London, UK', distance: 930, cost: 35, time: '3 hours' },
      { name: 'Rome, Italy', distance: 1180, cost: 30, time: '2.5 hours' },
      { name: 'Madrid, Spain', distance: 1870, cost: 45, time: '4 hours' }
    ]);

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Travel</h1>

        <Card className="bg-slate-800 border-slate-700">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Current Location</h2>
            <div className="flex items-center space-x-3 text-lg">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-white">{currentLocation}</span>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Available Destinations</h2>
            <div className="space-y-3">
              {destinations.map((destination, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-700 border border-slate-600">
                  <div>
                    <h3 className="font-semibold text-white">{destination.name}</h3>
                    <p className="text-slate-300 text-sm">{destination.distance} km • {destination.time}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-yellow-400 font-semibold">{destination.cost} Gold</p>
                      <p className="text-slate-400 text-sm">Travel Cost</p>
                    </div>
                    <Button size="sm">
                      <Plane className="w-4 h-4 mr-2" />
                      Travel
                    </Button>
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
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/storage" element={<StoragePage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/" element={<CompanyPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyPlaces;