# Europa - Full Stack Integration Contracts

## 📋 Frontend Implementation Summary

### ✅ Completed Features
- **Landing Page**: eRepublik-inspired design with military theme
- **User Registration**: Complete form with all world countries (193 countries)
- **Authentication System**: Login/logout with mock data
- **Navigation Menu**: Dynamic dropdown menus matching eRepublik structure
- **Dashboard**: User stats, daily tasks, quick actions, recent activity
- **My Places Module**:
  - Company management (create, view, upgrade companies)
  - Training Grounds (skill progression, training options)
  - Storage (inventory management with items)
  - Travel (country-to-country movement system)
- **Market Module**:
  - Marketplace (buy/sell items with quality ratings)
  - Monetary Market (currency exchange, trading interface)
- **Community Module**:
  - Military Unit (unit overview, battles, member rankings)
  - Political Party (elections, proposals, voting system)
- **Wars System**: Real-time battles, country vs country conflicts

### 🎨 Design Implementation
- **Color Scheme**: Dark slate theme similar to eRepublik
- **Typography**: Modern, readable fonts with proper hierarchy
- **Components**: Using shadcn/ui components for consistency
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and hover effects
- **Icons**: Lucide React icons throughout interface

## 🔄 Mock Data Currently Used

### User Data (`/src/App.js`)
```javascript
mockUser = {
  id: 1,
  name: 'John Doe', 
  email: 'user@europa.com',
  country: 'Albania',
  gold: 150,
  coins: 2500,
  level: 15,
  avatar: 'profile_image_url'
}
```

### Countries Data (`/src/mock/countries.js`)
- Complete list of 193 world countries with flags
- Used in registration and travel systems

### Game Data (Various Components)
- **Companies**: Steel Factory, Food Corp with production stats
- **Market Items**: Resources, consumables, equipment with quality ratings
- **Military Units**: European Elite Forces with member rankings
- **Wars**: Germany vs France, Italy vs Switzerland, Spain vs Portugal
- **Training Stats**: Strength, Leadership, Charisma progression
- **Inventory**: Food, Weapons, Steel, Oil, Medical Kits

## 🔧 Backend API Contracts

### Authentication Endpoints
```
POST /api/auth/register
Body: { username, email, password, country }
Response: { user, token }

POST /api/auth/login  
Body: { email, password }
Response: { user, token }

POST /api/auth/logout
Headers: { Authorization: Bearer <token> }
Response: { message: "Logged out successfully" }
```

### User Management
```
GET /api/users/profile
GET /api/users/stats
PUT /api/users/profile
GET /api/users/inventory
```

### Game Systems
```
GET /api/companies
POST /api/companies
PUT /api/companies/:id

GET /api/market/items
POST /api/market/buy
POST /api/market/sell

GET /api/military-units
POST /api/military-units/join
GET /api/military-units/:id/battles

GET /api/wars
POST /api/wars/:id/fight
GET /api/wars/:id/stats

GET /api/training/options
POST /api/training/train
GET /api/training/stats
```

## 📊 Database Schema Requirements

### Core Tables
- **users**: id, username, email, password_hash, country_id, gold, coins, level, avatar_url
- **countries**: id, name, code, flag_emoji
- **companies**: id, user_id, name, type, level, employees, productivity, location
- **market_items**: id, name, category, quality, price, quantity, seller_id
- **military_units**: id, name, leader_id, members_count, level, motto
- **wars**: id, attacker_country, defender_country, region, start_time, status
- **user_stats**: user_id, strength, experience, wellness, total_damage

### Relationship Tables  
- **user_companies**: user_id, company_id, role
- **user_military_units**: user_id, military_unit_id, rank, join_date
- **war_participants**: war_id, user_id, side, damage_dealt
- **user_inventory**: user_id, item_type, quantity

## 🔄 Frontend-Backend Integration Plan

### Phase 1: Authentication
1. Replace mock login with real API calls
2. Implement JWT token storage
3. Add protected route middleware
4. Handle registration with country selection

### Phase 2: Core Game Systems
1. User dashboard with real stats
2. Company management CRUD operations
3. Market functionality with real transactions
4. Inventory management system

### Phase 3: Social Features
1. Military unit membership
2. Wars and battle participation  
3. Political party system
4. Real-time battle updates

### Phase 4: Advanced Features
1. Training progression system
2. Travel and location tracking
3. Currency exchange system
4. Battle damage calculations

## ⚠️ Technical Considerations

### Security
- Password hashing (bcrypt)
- JWT token validation
- Rate limiting on endpoints
- Input validation and sanitization

### Performance
- Database indexing on frequently queried fields
- Pagination for large datasets (market, wars, users)
- Caching for static data (countries, item types)
- Real-time updates via WebSocket for battles

### Scalability
- Microservices architecture consideration
- Database sharding for user data
- CDN for static assets
- Load balancing for high traffic

## 🎯 Success Metrics

### User Engagement
- Registration completion rate
- Daily active users
- Session duration
- Feature adoption rates

### Game Balance
- Economic activity (market transactions)
- Military participation (battle engagement)
- Political involvement (voting, party membership)
- Progression rates (leveling, training)

---

**Status**: Frontend Complete ✅ | Backend Ready for Development 🚧
**Next Step**: Begin backend API development starting with authentication system