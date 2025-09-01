import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
    }

    // ✅ Same whoami call as your login - just reuse the logic
    const response = await fetch(`${BASE_URL}/organization/whoami`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader
      }
    });
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const userData = await response.json();
    
    return NextResponse.json({
      success: true,
      user: userData
    });
     
  } catch (error) {
    console.error('Whoami error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}