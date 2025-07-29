'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Leaf, Plus, TrendingUp, Award, Users, Upload, Camera, MapPin } from 'lucide-react'

interface User {
  id: string
  name: string
  userType: string
  greenTrustScore: number
  totalImpact: number
  email: string
}

interface Action {
  id: string
  title: string
  description: string
  actionType: string
  verificationStatus: string
  impactValue: number
  createdAt: string
  images: string[]
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [actions, setActions] = useState<Action[]>([])
  const [loading, setLoading] = useState(true)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(userData))
    fetchUserActions(token)
  }, [router])

  const fetchUserActions = async (token: string) => {
    try {
      const response = await fetch('/api/actions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setActions(data.actions)
      }
    } catch (error) {
      console.error('Failed to fetch actions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'text-green-600 bg-green-100'
      case 'PENDING': return 'text-yellow-600 bg-yellow-100'
      case 'UNDER_REVIEW': return 'text-blue-600 bg-blue-100'
      case 'REJECTED': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getActionTypeIcon = (type: string) => {
    switch (type) {
      case 'TREE_PLANTATION': return '🌳'
      case 'CLEANUP': return '🧹'
      case 'SOLAR_INSTALLATION': return '☀️'
      case 'PLASTIC_COLLECTION': return '♻️'
      case 'WASTE_REDUCTION': return '🗑️'
      case 'WATER_CONSERVATION': return '💧'
      case 'RENEWABLE_ENERGY': return '⚡'
      case 'SUSTAINABLE_TRANSPORT': return '🚲'
      case 'EDUCATION_OUTREACH': return '📚'
      default: return '🌱'
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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">GreenProof</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Green Trust Score™</p>
                <p className="text-2xl font-bold text-gray-900">
                  {user?.greenTrustScore.toFixed(1) || '0.0'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Impact</p>
                <p className="text-2xl font-bold text-gray-900">
                  {user?.totalImpact.toFixed(1) || '0.0'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Actions Submitted</p>
                <p className="text-2xl font-bold text-gray-900">{actions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
            >
              <div className="text-center">
                <Upload className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-green-600">Upload Action</span>
              </div>
            </button>
            
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
              <div className="text-center">
                <Camera className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-600">Take Photo</span>
              </div>
            </button>

            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-600">Add Location</span>
              </div>
            </button>

            <button 
              onClick={() => router.push('/leaderboard')}
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              <div className="text-center">
                <Award className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-600">View Leaderboard</span>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Recent Actions</h2>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Action</span>
            </button>
          </div>

          {actions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Upload className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No actions yet</h3>
              <p className="text-gray-600 mb-4">Start making an impact by uploading your first environmental action!</p>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Upload Your First Action
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {actions.map((action) => (
                <div key={action.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">
                        {getActionTypeIcon(action.actionType)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{action.title}</h3>
                        <p className="text-gray-600 mt-1">{action.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(action.verificationStatus)}`}>
                            {action.verificationStatus.replace('_', ' ')}
                          </span>
                          <span className="text-sm text-gray-500">
                            Impact: {action.impactValue}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(action.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal Placeholder */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Environmental Action</h3>
            <p className="text-gray-600 mb-6">This feature will be available soon! You'll be able to upload photos and videos of your environmental actions for verification.</p>
            <button
              onClick={() => setShowUploadModal(false)}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}