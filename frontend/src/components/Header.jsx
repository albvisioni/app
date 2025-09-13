import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { 
  ChevronDown, 
  User, 
  LogOut, 
  Home, 
  MapPin, 
  Building, 
  Target, 
  Package, 
  Plane,
  ShoppingCart,
  DollarSign,
  Users,
  Shield,
  Users2,
  Sword
} from 'lucide-react';

const Header = ({ user, onLogin, onLogout }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - in real app this would call backend
    onLogin({
      id: 1,
      name: 'John Doe',
      email: loginData.email,
      country: 'Albania',
      gold: 150,
      coins: 2500,
      level: 15,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    });
    setIsLoginOpen(false);
    setLoginData({ email: '', password: '' });
  };

  const menuItems = [
    {
      label: 'Home',
      icon: Home,
      path: '/',
      hasDropdown: false
    },
    {
      label: 'My Places',
      icon: MapPin,
      hasDropdown: true,
      items: [
        { label: 'Company', icon: Building, path: '/my-places/company' },
        { label: 'Training Grounds', icon: Target, path: '/my-places/training' },
        { label: 'Storage', icon: Package, path: '/my-places/storage' },
        { label: 'Travel', icon: Plane, path: '/my-places/travel' }
      ]
    },
    {
      label: 'Market',
      icon: ShoppingCart,
      hasDropdown: true,
      items: [
        { label: 'Marketplace', icon: ShoppingCart, path: '/market/marketplace' },
        { label: 'Monetary Market', icon: DollarSign, path: '/market/monetary' }
      ]
    },
    {
      label: 'Community',
      icon: Users,
      hasDropdown: true,
      items: [
        { label: 'My Military Unit', icon: Shield, path: '/community/military-unit' },
        { label: 'My Party', icon: Users2, path: '/community/party' }
      ]
    },
    {
      label: 'Wars',
      icon: Sword,
      path: '/wars',
      hasDropdown: false
    }
  ];

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 shadow-2xl">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 border-b border-slate-700">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">EUROPA</h1>
              <p className="text-xs text-slate-300">Strategy & Politics</p>
            </div>
          </Link>

          {/* User Area */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Currency Display */}
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center space-x-1 bg-yellow-500/20 px-3 py-1 rounded-lg">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-yellow-400 font-medium">{user.gold}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-gray-500/20 px-3 py-1 rounded-lg">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-300 font-medium">{user.coins}</span>
                  </div>
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(dropdownOpen === 'user' ? null : 'user')}
                    className="flex items-center space-x-2 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors"
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-slate-600"
                    />
                    <div className="text-left">
                      <p className="text-white text-sm font-medium">{user.name}</p>
                      <p className="text-slate-300 text-xs">Lvl {user.level}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {dropdownOpen === 'user' && (
                    <Card className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border-slate-700 z-50">
                      <div className="p-2 space-y-1">
                        <Link 
                          to="/profile" 
                          className="flex items-center space-x-2 p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        <button 
                          onClick={onLogout}
                          className="w-full flex items-center space-x-2 p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsLoginOpen(true)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        {user && (
          <nav className="py-3">
            <ul className="flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <li key={index} className="relative">
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setDropdownOpen(dropdownOpen === item.label ? null : item.label)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                          dropdownOpen === item.label 
                            ? 'bg-slate-700 text-white' 
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {dropdownOpen === item.label && (
                        <Card className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border-slate-700 z-50">
                          <div className="p-2 space-y-1">
                            {item.items.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subItem.path}
                                onClick={() => setDropdownOpen(null)}
                                className="flex items-center space-x-2 p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
                              >
                                <subItem.icon className="w-4 h-4" />
                                <span>{subItem.label}</span>
                              </Link>
                            ))}
                          </div>
                        </Card>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? 'bg-slate-700 text-white'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 bg-slate-800 border-slate-700">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Sign In to Europa</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
                <div className="flex space-x-3">
                  <Button 
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    Sign In
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setIsLoginOpen(false)}
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </header>
  );
};

export default Header;