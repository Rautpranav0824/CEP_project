'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Leaf, Trophy, Medal, Award, User, Building, Heart, TrendingUp } from 'lucide-react'

interface LeaderboardUser {
  id: string
  name: string
  userType: string
  greenTrustScore: number
  totalImpact: number
  avatar?: string
  location?: string
  rank: number
  verifiedActions: number
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard')
      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data.leaderboard)
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredLeaderboard = leaderboard.filter(user => 
    filter === 'ALL' || user.userType === filter
  )

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2: return <Medal className="h-6 w-6 text-gray-400" />
      case 3: return <Award className="h-6 w-6 text-amber-600" />
      default: return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'INDIVIDUAL': return <User className="h-5 w-5 text-blue-600" />
      case 'NGO': return <Heart className="h-5 w-5 text-red-600" />
      case 'COMPANY': return <Building className="h-5 w-5 text-purple-600" />
      default: return <User className="h-5 w-5 text-gray-600" />
    }
  }

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'INDIVIDUAL': return 'bg-blue-100 text-blue-800'
      case 'NGO': return 'bg-red-100 text-red-800'
      case 'COMPANY': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">GreenProof</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-green-700 hover:text-green-800 font-medium">
                Dashboard
              </Link>
              <Link href="/login" className="text-green-700 hover:text-green-800 font-medium">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏆 Green Trust Score™ Leaderboard
          </h1>
          <p className="text-xl text-gray-600">
            Top environmental champions making real impact
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            {['ALL', 'INDIVIDUAL', 'NGO', 'COMPANY'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  filter === filterType
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filterType === 'ALL' ? 'All' : filterType.charAt(0) + filterType.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        {filteredLeaderboard.length >= 3 && (
          <div className="mb-12">
            <div className="flex justify-center items-end space-x-4">
              {/* 2nd Place */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center max-w-xs">
                <div className="mb-4">
                  <Medal className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                  <span className="text-2xl font-bold text-gray-600">#2</span>
                </div>
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                    {getUserTypeIcon(filteredLeaderboard[1].userType)}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{filteredLeaderboard[1].name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getUserTypeColor(filteredLeaderboard[1].userType)}`}>
                    {filteredLeaderboard[1].userType}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-bold text-green-600">{filteredLeaderboard[1].greenTrustScore.toFixed(1)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{filteredLeaderboard[1].verifiedActions} verified actions</p>
                </div>
              </div>

              {/* 1st Place */}
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl shadow-xl p-8 text-center max-w-xs transform scale-110">
                <div className="mb-4">
                  <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-2" />
                  <span className="text-3xl font-bold text-yellow-600">#1</span>
                </div>
                <div className="mb-4">
                  <div className="w-20 h-20 bg-white rounded-full mx-auto mb-2 flex items-center justify-center shadow-md">
                    {getUserTypeIcon(filteredLeaderboard[0].userType)}
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">{filteredLeaderboard[0].name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getUserTypeColor(filteredLeaderboard[0].userType)}`}>
                    {filteredLeaderboard[0].userType}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="font-bold text-xl text-green-600">{filteredLeaderboard[0].greenTrustScore.toFixed(1)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{filteredLeaderboard[0].verifiedActions} verified actions</p>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center max-w-xs">
                <div className="mb-4">
                  <Award className="h-16 w-16 text-amber-600 mx-auto mb-2" />
                  <span className="text-2xl font-bold text-amber-600">#3</span>
                </div>
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                    {getUserTypeIcon(filteredLeaderboard[2].userType)}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{filteredLeaderboard[2].name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getUserTypeColor(filteredLeaderboard[2].userType)}`}>
                    {filteredLeaderboard[2].userType}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-bold text-green-600">{filteredLeaderboard[2].greenTrustScore.toFixed(1)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{filteredLeaderboard[2].verifiedActions} verified actions</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Complete Rankings</h2>
          </div>
          
          {filteredLeaderboard.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Trophy className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">Be the first to make an environmental impact!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredLeaderboard.map((user) => (
                <div key={user.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getRankIcon(user.rank)}
                      </div>
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        {getUserTypeIcon(user.userType)}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUserTypeColor(user.userType)}`}>
                            {user.userType}
                          </span>
                          {user.location && (
                            <span className="text-sm text-gray-500">{user.location}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-xl font-bold text-green-600">
                          {user.greenTrustScore.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {user.verifiedActions} verified actions
                      </p>
                      <p className="text-sm text-gray-600">
                        Impact: {user.totalImpact.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want to join the leaderboard?
          </h3>
          <p className="text-gray-600 mb-6">
            Start making verified environmental impact and climb the rankings!
          </p>
          <Link 
            href="/register"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  )
}