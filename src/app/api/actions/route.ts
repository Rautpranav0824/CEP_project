import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ActionType, VerificationStatus } from '@/generated/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const actionType = searchParams.get('actionType') as ActionType | null
    const verificationStatus = searchParams.get('verificationStatus') as VerificationStatus | null
    const userId = searchParams.get('userId')

    const skip = (page - 1) * limit

    const where: any = {}

    if (actionType && Object.values(ActionType).includes(actionType)) {
      where.actionType = actionType
    }

    if (verificationStatus && Object.values(VerificationStatus).includes(verificationStatus)) {
      where.verificationStatus = verificationStatus
    }

    if (userId) {
      where.userId = userId
    }

    const [actions, total] = await Promise.all([
      prisma.action.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              userType: true,
              avatar: true,
              greenTrustScore: true,
            }
          },
          verifications: {
            select: {
              id: true,
              score: true,
              comments: true,
              createdAt: true,
            }
          },
          _count: {
            select: {
              verifications: true,
            }
          }
        }
      }),
      prisma.action.count({ where })
    ])

    return NextResponse.json({
      actions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    })

  } catch (error) {
    console.error('Actions fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}