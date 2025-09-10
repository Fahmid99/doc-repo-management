// src/app/api/inbox/route.ts
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL;

// Define which roles see which statuses
const ROLE_STATUS_MAPPING = {
  'compliance authority': ['compliance authority review'],
  'document controller': ['document controller review'],
  'manager': ['manager review', 'pending approval'],
  'admin': ['all'], // Admins see everything
} as const;

export async function GET(request: NextRequest) {
  try {
    // ✅ Get user data from your middleware
    const userData = JSON.parse(request.headers.get('x-user-data') || '{}');
    const userRoles = JSON.parse(request.headers.get('x-user-roles') || '[]');
    const authHeader = request.headers.get('authorization');

    console.log(`📥 Inbox request from: ${userData.name}`);
    console.log(`👤 User roles:`, userRoles.map((r: any) => r.name));

    // Determine what statuses this user can see based on their roles
    const visibleStatuses = getVisibleStatusesForUser(userRoles);
    
    if (visibleStatuses.length === 0) {
      return NextResponse.json({
        data: [],
        message: "No items available for your role",
        metadata: {
          userRoles: userRoles.map((r: any) => r.name),
          visibleStatuses: []
        }
      });
    }

    console.log(`✅ User can see statuses:`, visibleStatuses);

    // Build query parameters for backend
    const queryParams = new URLSearchParams();
    
    if (visibleStatuses.includes('all')) {
      // Admin sees everything - no status filter
      console.log('🔓 Admin access - fetching all items');
    } else {
      // Filter by specific statuses for the user's role
      visibleStatuses.forEach(status => {
        queryParams.append('status', status);
      });
      console.log(`🔒 Filtering by statuses: ${visibleStatuses.join(', ')}`);
    }

    // Fetch filtered data from your backend
    const response = await fetch(`${BASE_URL}/inbox?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader!,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('❌ Backend fetch failed:', response.status);
      return NextResponse.json(
        { error: 'Failed to fetch inbox data' },
        { status: response.status }
      );
    }

    const inboxData = await response.json();
    console.log(`📊 Fetched ${inboxData.length} items from backend`);

    // Additional security filtering on the frontend
    const filteredData = filterDataByRole(inboxData, userRoles, userData);
    console.log(`🛡️ After role filtering: ${filteredData.length} items`);

    return NextResponse.json({
      data: filteredData,
      metadata: {
        userRoles: userRoles.map((r: any) => r.name),
        visibleStatuses,
        totalCount: filteredData.length,
        userName: userData.name,
      }
    });

  } catch (error) {
    console.error('❌ Inbox API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to determine what statuses a user can see
function getVisibleStatusesForUser(userRoles: any[]): string[] {
  const roleNames = userRoles.map((role: any) => role.name.toLowerCase());
  const visibleStatuses: Set<string> = new Set();

  roleNames.forEach(roleName => {
    const statuses = ROLE_STATUS_MAPPING[roleName as keyof typeof ROLE_STATUS_MAPPING];
    if (statuses) {
      statuses.forEach(status => visibleStatuses.add(status));
    }
  });

  return Array.from(visibleStatuses);
}

// Additional security layer - filter items by role
function filterDataByRole(data: any[], userRoles: any[], userData: any): any[] {
  const roleNames = userRoles.map((role: any) => role.name.toLowerCase());
  
  return data.filter(item => {
    // Compliance Authority: can see items in compliance authority review
    if (item.status === 'compliance authority review') {
      return roleNames.includes('compliance authority') || roleNames.includes('admin');
    }
    
    // Document Controller: can see items in document controller review  
    if (item.status === 'document controller review') {
      return roleNames.includes('document controller') || roleNames.includes('admin');
    }
    
    // Manager: can see manager review items
    if (item.status === 'manager review' || item.status === 'pending approval') {
      return roleNames.includes('manager') || roleNames.includes('admin');
    }
    
    // Default: users can see items they created or are assigned to
    return item.createdBy === userData.id || 
           item.assignedTo === userData.id || 
           roleNames.includes('admin');
  });
}