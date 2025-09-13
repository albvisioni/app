import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Search,
  Filter,
  Star,
  Package
} from 'lucide-react';

const Market = ({ user }) => {
  const MarketplacePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const [marketItems, setMarketItems] = useState([
      { id: 1, name: 'Steel Q3', category: 'resources', price: 15, seller: 'GermanCorp', quality: 3, quantity: 500, icon: '🔩' },
      { id: 2, name: 'Food Q5', category: 'consumables', price: 8, seller: 'FoodMaster', quality: 5, quantity: 200, icon: '🍖' },
      { id: 3, name: 'Weapons Q4', category: 'equipment', price: 45, seller: 'ArmsTrade', quality: 4, quantity: 50, icon: '⚔️' },
      { id: 4, name: 'Oil Q2', category: 'resources', price: 12, seller: 'BlackGold', quality: 2, quantity: 300, icon: '🛢️' },
      { id: 5, name: 'Medical Kit Q5', category: 'consumables', price: 25, seller: 'HealthCorp', quality: 5, quantity: 75, icon: '🏥' },
      { id: 6, name: 'Tank Q3', category: 'equipment', price: 150, seller: 'MilitarySupply', quality: 3, quantity: 10, icon: '🚗' }
    ]);

    const categories = ['all', 'resources', 'consumables', 'equipment'];

    const filteredItems = marketItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Marketplace</h1>
          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
            Sell Items
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="bg-slate-800 border-slate-700">
          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-white hover:bg-slate-700 capitalize">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Market Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-slate-400 text-sm capitalize">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <span className="text-slate-300 text-sm mr-2">Quality:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= item.quality ? 'text-yellow-400 fill-current' : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Price:</span>
                    <span className="text-yellow-400 font-semibold">{item.price} Gold</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Available:</span>
                    <span className="text-white">{item.quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Seller:</span>
                    <span className="text-blue-400">{item.seller}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Input
                    placeholder="Qty"
                    type="number"
                    min="1"
                    max={item.quantity}
                    defaultValue="1"
                    className="w-20 bg-slate-700 border-slate-600 text-white"
                  />
                  <Button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    Buy
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card className="bg-slate-800 border-slate-700">
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No items found</h3>
              <p className="text-slate-300">Try adjusting your search or filters</p>
            </div>
          </Card>
        )}
      </div>
    );
  };

  const MonetaryPage = () => {
    const [exchangeRates, setExchangeRates] = useState([
      { from: 'Gold', to: 'USD', rate: 1.25, change: '+2.1%', trend: 'up' },
      { from: 'Gold', to: 'EUR', rate: 1.08, change: '-0.8%', trend: 'down' },
      { from: 'Gold', to: 'GBP', rate: 0.95, change: '+1.5%', trend: 'up' },
      { from: 'Gold', to: 'CNY', rate: 8.45, change: '+0.3%', trend: 'up' }
    ]);

    const [transactions, setTransactions] = useState([
      { id: 1, type: 'buy', amount: 100, currency: 'Gold', rate: 1.25, total: 125, date: '2 hours ago' },
      { id: 2, type: 'sell', amount: 50, currency: 'Gold', rate: 1.08, total: 54, date: '5 hours ago' },
      { id: 3, type: 'buy', amount: 200, currency: 'Gold', rate: 0.95, total: 190, date: '1 day ago' }
    ]);

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Monetary Market</h1>

        {/* Exchange Rates */}
        <Card className="bg-slate-800 border-slate-700">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Exchange Rates
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {exchangeRates.map((rate, index) => (
                <div key={index} className="p-4 rounded-lg bg-slate-700 border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">{rate.from}/{rate.to}</span>
                    <div className={`flex items-center text-sm ${
                      rate.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {rate.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {rate.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">{rate.rate}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Trading Interface */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-4">Buy Gold</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-slate-300 text-sm">Amount (USD)</label>
                  <Input
                    type="number"
                    placeholder="100.00"
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm">You will receive</label>
                  <div className="mt-1 p-3 bg-slate-700 rounded-lg border border-slate-600 text-white">
                    ~80 Gold
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  Buy Gold
                </Button>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-4">Sell Gold</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-slate-300 text-sm">Amount (Gold)</label>
                  <Input
                    type="number"
                    placeholder="50"
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm">You will receive</label>
                  <div className="mt-1 p-3 bg-slate-700 rounded-lg border border-slate-600 text-white">
                    ~$62.50 USD
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                  Sell Gold
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="bg-slate-800 border-slate-700">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-700 border border-slate-600">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.type === 'buy' ? '+' : '-'}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.amount} {transaction.currency}
                      </p>
                      <p className="text-slate-400 text-sm">Rate: {transaction.rate} • {transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">${transaction.total}</p>
                    <p className="text-slate-400 text-sm">Total</p>
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
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/monetary" element={<MonetaryPage />} />
          <Route path="/" element={<MarketplacePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Market;