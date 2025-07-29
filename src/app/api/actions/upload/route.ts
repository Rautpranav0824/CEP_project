import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'
import { updateUserGreenTrustScore } from '@/lib/greenTrustScore'
import { ActionType } from '@/generated/prisma'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const user = await getUserFromToken(token)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const {
      title,
      description,
      actionType,
      latitude,
      longitude,
      location,
      images,
      videos,
      impactValue,
      carbonOffset,
      treesPlanted,
      wasteCollected,
      peopleReached
    } = await request.json()

    // Validation
    if (!title || !description || !actionType) {
      return NextResponse.json(
        { error: 'Title, description, and action type are required' },
        { status: 400 }
      )
    }

    if (!Object.values(ActionType).includes(actionType)) {
      return NextResponse.json(
        { error: 'Invalid action type' },
        { status: 400 }
      )
    }

    // Create action
    const action = await prisma.action.create({
      data: {
        title,
        description,
        actionType,
        latitude: latitude || null,
        longitude: longitude || null,
        location: location || null,
        images: images || [],
        videos: videos || [],
        impactValue: impactValue || 0,
        carbonOffset: carbonOffset || null,
        treesPlanted: treesPlanted || null,
        wasteCollected: wasteCollected || null,
        peopleReached: peopleReached || null,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            userType: true,
            avatar: true,
          }
        }
      }
    })

    // Start AI verification process (placeholder for now)
    // In a real implementation, this would trigger AI analysis
    await prisma.verification.create({
      data: {
        actionId: action.id,
        comments: 'Automated verification in progress',
        score: 0,
        aiAnalysis: JSON.stringify({
          status: 'pending',
          confidence: 0,
          checks: {
            imageAnalysis: 'pending',
            metadataValidation: 'pending',
            duplicateCheck: 'pending'
          }
        }),
        metadataCheck: false,
      }
    })

    // Recalculate user's Green Trust Score
    await updateUserGreenTrustScore(user.id)

    return NextResponse.json({
      message: 'Action uploaded successfully',
      action,
    })

  } catch (error) {
    console.error('Action upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}