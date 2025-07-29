import { NextRequest, NextResponse } from 'next/server'
import { getLeaderboard } from '../../../lib/greenTrustScore'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')

    const leaderboard = await getLeaderboard(limit)

    return NextResponse.json({
      leaderboard,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Leaderboard fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}