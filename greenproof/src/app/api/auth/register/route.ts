import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { hashPassword, generateToken } from '../../../../lib/auth'
type UserType = 'INDIVIDUAL' | 'NGO' | 'COMPANY'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, userType, description, website, location } = await request.json()

    // Validation
    if (!email || !password || !name || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!['INDIVIDUAL', 'NGO', 'COMPANY'].includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        userType,
        description: description || null,
        website: website || null,
        location: location || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        userType: true,
        description: true,
        website: true,
        location: true,
        greenTrustScore: true,
        totalImpact: true,
        createdAt: true,
      }
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      userType: user.userType,
    })

    return NextResponse.json({
      message: 'User created successfully',
      user,
      token,
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}