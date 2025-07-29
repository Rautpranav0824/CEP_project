import Link from 'next/link'
import { Leaf, Award, Users, TrendingUp, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">GreenProof</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="text-green-700 hover:text-green-800 font-medium"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Revolutionize Environmental
            <span className="text-green-600 block">Impact Tracking</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Replace outdated carbon credit systems with real-time, transparent, and AI-powered 
            environmental reputation scoring for NGOs, individuals, and companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Start Your Green Journey
            </Link>
            <Link 
              href="/leaderboard" 
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to prove and track your environmental impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-green-50 p-8 rounded-xl">
              <Leaf className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Green Karma Uploads
              </h3>
              <p className="text-gray-600">
                Upload proof of environmental actions like tree plantations, cleanups, 
                solar installations, and waste reduction initiatives.
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Live Verification System
              </h3>
              <p className="text-gray-600">
                AI + community validation of uploaded content using GPS metadata 
                and satellite APIs. No months of manual auditing required.
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-xl">
              <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Green Trust Score™
              </h3>
              <p className="text-gray-600">
                Dynamic eco-score based on verified impact that reflects how 
                genuinely sustainable your actions are.
              </p>
            </div>

            <div className="bg-orange-50 p-8 rounded-xl">
              <Users className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Impact Dashboard
              </h3>
              <p className="text-gray-600">
                Public dashboards for top NGOs, individuals, and businesses with 
                gamified contribution boards and rankings.
              </p>
            </div>

            <div className="bg-pink-50 p-8 rounded-xl">
              <Award className="h-12 w-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Impact Badge NFTs
              </h3>
              <p className="text-gray-600">
                Each verified action can mint a collectible Impact Badge. 
                Supporters can buy badges to fund further eco-work.
              </p>
            </div>

            <div className="bg-indigo-50 p-8 rounded-xl">
              <Zap className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Eco Marketplace
              </h3>
              <p className="text-gray-600">
                Companies can purchase verified impact from organizations and 
                individuals, removing greenwashing with traceable impact flows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Real Environmental Impact?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of individuals, NGOs, and companies already using GreenProof 
            to create transparent, verifiable environmental change.
          </p>
          <Link 
            href="/register" 
            className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-400" />
              <span className="text-xl font-bold">GreenProof</span>
            </div>
            <p className="text-gray-400">
              © 2024 GreenProof. Building a sustainable future together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}