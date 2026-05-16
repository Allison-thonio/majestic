import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, checkRateLimit, getClientIP, sanitizeInput, isValidEmail } from '@/lib/security';
import { createUser, createSession, getUserByEmail } from '@/lib/store';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = await getClientIP();
    if (!checkRateLimit(clientIP, 100, 15 * 60 * 1000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await request.json();
    const { email, password, confirmPassword } = body;

    // Validation
    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'Email, password, and confirmation are required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Check if user exists
    if (getUserByEmail(sanitizeInput(email))) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Create user
    const hashedPassword = hashPassword(password);
    const user = createUser(sanitizeInput(email), hashedPassword, 'customer');

    // Create session
    const sessionId = createSession(user.id);

    // Set secure cookie
    const cookieStore = await cookies();
    cookieStore.set('session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60,
    });

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
