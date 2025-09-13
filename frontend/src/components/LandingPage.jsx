import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  MapPin, 
  Building, 
  Target, 
  Shield, 
  Coins, 
  Trophy,
  Globe,
  Users,
  Sword,
  Star
} from 'lucide-react';
import { countries } from '../mock/countries';

const LandingPage = ({ onRegister }) => {
  const [registrationData, setRegistrationData] = useState({
    username: '',
    email: '',
    password: '',
    country: ''
  });

  const handleRegister = (e) => {
    e.preventDefault();
    if (registrationData.username && registrationData.email && registrationData.password && registrationData.country) {
      onRegister(registrationData);
    }
  };

  const features = [
    {
      icon: MapPin,
      title: 'Conquer territories',
      description: 'Expand your country\'s borders and extend its territories'
    },
    {
      icon: Building,
      title: 'Build a company',
      description: 'Develop your economic empire and manage businesses'
    },
    {
      icon: Sword,
      title: 'Fight on the battlefield',
      description: 'Engage in epic battles with players worldwide'
    }
  ];

  const topCountries = [
    { name: 'Germany', population: 3737, flag: '🇩🇪' },
    { name: 'United Kingdom', population: 2187, flag: '🇬🇧' },
    { name: 'France', population: 1789, flag: '🇫🇷' },
    { name: 'Italy', population: 1559, flag: '🇮🇹' },
    { name: 'Spain', population: 1462, flag: '🇪🇸' }
  ];

  const testimonials = [
    {
      quote: "Europa creates a compelling strategy experience",
      author: "The Guardian",
      type: "review"
    },
    {
      quote: "Europa offers a real alternative to traditional gaming",
      author: "GameCrunch",
      type: "review"
    },
    {
      quote: "Europa takes strategy games to the next level",
      author: "TechReview",
      type: "review"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop")'
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">E</span>
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold text-white tracking-tight">EUROPA</h1>
                    <p className="text-blue-300 text-lg">Strategy & Politics</p>
                  </div>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  A new world is emerging.
                  <br />
                  <span className="text-blue-400">Your country needs YOU!</span>
                </h2>
                
                <p className="text-xl text-slate-300 mb-8 max-w-2xl">
                  Join millions of players in an epic multiplayer strategy game. Build your empire, 
                  lead your nation, and fight for dominance in this political and military simulation.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  Sign up now
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500/20 px-8 py-4 text-lg font-semibold"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Sign up with Facebook
                </Button>
              </div>
            </div>

            {/* Right Content - Registration Form */}
            <div className="flex justify-center lg:justify-end">
              <Card className="w-full max-w-md bg-slate-800/90 backdrop-blur border-slate-700 shadow-2xl">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Join Europa</h3>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Username"
                      value={registrationData.username}
                      onChange={(e) => setRegistrationData({...registrationData, username: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 h-12"
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={registrationData.email}
                      onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 h-12"
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={registrationData.password}
                      onChange={(e) => setRegistrationData({...registrationData, password: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 h-12"
                      required
                    />
                    <Select onValueChange={(value) => setRegistrationData({...registrationData, country: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-12">
                        <SelectValue placeholder="Choose your country" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.name} className="text-white hover:bg-slate-700">
                            {country.flag} {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-12 text-lg font-semibold"
                    >
                      Create Account
                    </Button>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features, Countries, and Testimonials Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Features */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Features
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-slate-300 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Countries */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                Top countries
              </h3>
              <div className="space-y-3">
                {topCountries.map((country, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{country.flag}</span>
                      <span className="text-white font-medium">{country.name}</span>
                    </div>
                    <div className="flex items-center text-slate-400">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{country.population}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-yellow-500" />
                What others are saying
              </h3>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <p className="text-slate-300 italic mb-2">"{testimonial.quote}"</p>
                    <p className="text-blue-400 font-medium text-sm">{testimonial.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;