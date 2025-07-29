import { prisma } from './prisma'
type ActionType = 'TREE_PLANTATION' | 'CLEANUP' | 'SOLAR_INSTALLATION' | 'PLASTIC_COLLECTION' | 'WASTE_REDUCTION' | 'WATER_CONSERVATION' | 'RENEWABLE_ENERGY' | 'SUSTAINABLE_TRANSPORT' | 'EDUCATION_OUTREACH' | 'OTHER'
type VerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW'

// Base scores for different action types
const ACTION_BASE_SCORES = {
  TREE_PLANTATION: 10,
  CLEANUP: 8,
  SOLAR_INSTALLATION: 15,
  PLASTIC_COLLECTION: 6,
  WASTE_REDUCTION: 7,
  WATER_CONSERVATION: 9,
  RENEWABLE_ENERGY: 12,
  SUSTAINABLE_TRANSPORT: 5,
  EDUCATION_OUTREACH: 8,
  OTHER: 5,
}

// Multipliers based on verification status
const VERIFICATION_MULTIPLIERS = {
  APPROVED: 1.0,
  UNDER_REVIEW: 0.5,
  PENDING: 0.3,
  REJECTED: 0,
}

export interface ScoreBreakdown {
  baseScore: number
  verificationMultiplier: number
  impactMultiplier: number
  communityBonus: number
  finalScore: number
}

export async function calculateActionScore(actionId: string): Promise<ScoreBreakdown> {
  const action = await prisma.action.findUnique({
    where: { id: actionId },
    include: {
      verifications: true,
    }
  })

  if (!action) {
    throw new Error('Action not found')
  }

  const baseScore = ACTION_BASE_SCORES[action.actionType as ActionType] || 5
  const verificationMultiplier = VERIFICATION_MULTIPLIERS[action.verificationStatus as VerificationStatus]
  
  // Impact multiplier based on quantifiable metrics
  let impactMultiplier = 1.0
  if (action.treesPlanted && action.treesPlanted > 0) {
    impactMultiplier += Math.log10(action.treesPlanted) * 0.2
  }
  if (action.wasteCollected && action.wasteCollected > 0) {
    impactMultiplier += Math.log10(action.wasteCollected) * 0.15
  }
  if (action.carbonOffset && action.carbonOffset > 0) {
    impactMultiplier += Math.log10(action.carbonOffset) * 0.25
  }
  if (action.peopleReached && action.peopleReached > 0) {
    impactMultiplier += Math.log10(action.peopleReached) * 0.1
  }

  // Community voting bonus
  const communityBonus = Math.min(action.communityVotes * 0.1, 2.0)

  const finalScore = (baseScore * verificationMultiplier * impactMultiplier) + communityBonus

  return {
    baseScore,
    verificationMultiplier,
    impactMultiplier,
    communityBonus,
    finalScore
  }
}

export async function updateUserGreenTrustScore(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      actions: {
        where: {
          verificationStatus: {
            in: ['APPROVED', 'UNDER_REVIEW', 'PENDING']
          }
        }
      }
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  let totalScore = 0
  let totalImpact = 0

  for (const action of user.actions) {
    const scoreBreakdown = await calculateActionScore(action.id)
    totalScore += scoreBreakdown.finalScore
    totalImpact += action.impactValue
  }

  // Apply user type multipliers
  const userTypeMultipliers = {
    INDIVIDUAL: 1.0,
    NGO: 1.2, // NGOs get a slight bonus for their mission
    COMPANY: 0.9, // Companies need to work harder for the same score
  }

  const finalScore = totalScore * userTypeMultipliers[user.userType as keyof typeof userTypeMultipliers]

  // Update user's score in database
  await prisma.user.update({
    where: { id: userId },
    data: {
      greenTrustScore: finalScore,
      totalImpact: totalImpact,
    }
  })

  // Record score history
  await prisma.scoreHistory.create({
    data: {
      userId,
      score: finalScore,
      reason: 'score_recalculation'
    }
  })

  return finalScore
}

export async function getLeaderboard(limit: number = 50) {
  const topUsers = await prisma.user.findMany({
    orderBy: {
      greenTrustScore: 'desc'
    },
    take: limit,
    select: {
      id: true,
      name: true,
      userType: true,
      greenTrustScore: true,
      totalImpact: true,
      avatar: true,
      location: true,
      actions: {
        where: {
          verificationStatus: 'APPROVED'
        },
        select: {
          id: true,
          actionType: true,
          impactValue: true,
        }
      }
    }
  })

  return topUsers.map((user: any, index: number) => ({
    ...user,
    rank: index + 1,
    verifiedActions: user.actions.length,
  }))
}

export async function getUserRank(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { greenTrustScore: true }
  })

  if (!user) return 0

  const higherScoredUsers = await prisma.user.count({
    where: {
      greenTrustScore: {
        gt: user.greenTrustScore
      }
    }
  })

  return higherScoredUsers + 1
}