# 🌱 GreenProof - Environmental Impact Tracking Platform

GreenProof is a revolutionary web-based platform that replaces outdated carbon credit systems with a real-time, transparent, and AI-powered environmental reputation system for NGOs, individuals, and companies.

Instead of trading generic "carbon credits", GreenProof creates a **Green Trust Score™**, a dynamic, verifiable score based on real-world, verified eco-actions.

## ✨ Key Features

### 🌿 Green Karma Uploads
- Upload proof (images/videos) of environmental actions
- Support for tree plantations, cleanups, solar installations, plastic collection drives
- GPS metadata integration for location verification

### 🔍 Live Verification System
- AI + community validation of uploaded content
- GPS metadata and optional satellite API integration
- No need for months of manual audit processes

### 📊 Green Trust Score™
- Dynamic eco-score based on verified impact
- Reflects genuine sustainability of actions
- User type-specific scoring multipliers

### 🏆 Leaderboard and Impact Dashboard
- Public dashboards for top NGOs, individuals, and businesses
- Gamified contribution board with rankings
- Real-time impact statistics

### 🎖️ Impact Badge NFTs (Future Feature)
- Each verified action can mint a collectible Impact Badge
- Donors and supporters can buy badges to fund eco-work
- Blockchain integration with Polygon/Solana

### 🛒 Eco Marketplace (Future Feature)
- Companies can purchase verified impact from organizations
- Removes greenwashing with traceable, authentic impact flows

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **UI Components**: Lucide React icons, custom components
- **Deployment**: Vercel-ready configuration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd greenproof
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key"
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
greenproof/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── dashboard/      # User dashboard
│   │   ├── leaderboard/    # Public leaderboard
│   │   ├── login/          # Authentication
│   │   └── register/       # User registration
│   ├── lib/                # Utility libraries
│   │   ├── auth.ts         # Authentication utilities
│   │   ├── greenTrustScore.ts # Scoring system
│   │   └── prisma.ts       # Database client
│   └── generated/          # Prisma generated files
├── prisma/
│   └── schema.prisma       # Database schema
└── public/                 # Static assets
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Actions
- `GET /api/actions` - Fetch actions with filtering
- `POST /api/actions/upload` - Upload new environmental action

### Leaderboard
- `GET /api/leaderboard` - Get top users by Green Trust Score

## 🎯 User Types

### 👤 Individual
- Personal environmental actions
- Base scoring multiplier: 1.0x
- Focus on personal impact tracking

### ❤️ NGO
- Organization-level environmental initiatives  
- Scoring multiplier: 1.2x (mission bonus)
- Enhanced profile features

### 🏢 Company
- Corporate sustainability programs
- Scoring multiplier: 0.9x (higher standards)
- Future marketplace integration

## 🏆 Green Trust Score™ Calculation

The scoring system considers:

1. **Base Action Score**: Different values for action types
   - Tree Plantation: 10 points
   - Solar Installation: 15 points
   - Cleanup: 8 points
   - etc.

2. **Verification Multiplier**:
   - Approved: 1.0x
   - Under Review: 0.5x
   - Pending: 0.3x
   - Rejected: 0x

3. **Impact Multiplier**: Based on quantifiable metrics
   - Trees planted, waste collected, carbon offset
   - Logarithmic scaling for larger impacts

4. **Community Bonus**: Up to +2.0 points from community votes

5. **User Type Multiplier**: Applied to final score

## 🔮 Future Enhancements

- [ ] AI-powered image verification using computer vision
- [ ] Satellite API integration for location verification
- [ ] NFT badge minting on Polygon/Solana
- [ ] Mobile app with camera integration
- [ ] Advanced analytics and reporting
- [ ] Corporate marketplace for impact trading
- [ ] Multi-language support
- [ ] Social features and team challenges

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌍 Making an Impact

GreenProof is more than just a platform - it's a movement towards transparent, verifiable environmental action. By replacing outdated carbon credit systems with real-time impact tracking, we're building a future where every environmental action counts and can be trusted.

Join us in revolutionizing how we track, verify, and celebrate environmental impact! 🌱

---

**Built with ❤️ for the planet** 🌍