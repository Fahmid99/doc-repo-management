import { Role } from "@/app/library/types/role";
import { NextRequest, NextResponse } from "next/server";
const BASE_URL = process.env.BASE_URL;
// /api/inbox/route.ts
export async function GET(request: NextRequest) {
  const INBOX_RELEVANT_ROLES = [
    "Compliance Authority",
    "Document Controller",
    "Quality Manager",
  ];

  try {
    // ✅ Get auth token from request
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "No authorization header" },
        { status: 401 }
      );
    }

    const userDataHeader = request.headers.get("x-user-data");
    const userData = JSON.parse(userDataHeader || "{}");

    const userInboxRoles =
      userData.effectiveroles
        ?.map((role: Role) => role.name)
        .filter((roleName: string) =>
          INBOX_RELEVANT_ROLES.includes(roleName)
        ) || [];

    const allRequests = [];

    for (const role of userInboxRoles) {
      try {
        const params = new URLSearchParams({
          type: 'crchangerequestnewdoc',
          query: `assignedTo=${role}`,
          offset: '0',
          limit: '-1',
          header: 'false',
          datameta: 'false'
        });
        
        const url = `${BASE_URL}/result/query?${params.toString()}`;
        
        // ✅ Pass auth token to Swagger API
        const response = await fetch(url, {
          headers: {
            'Authorization': authHeader  // ← Forward the auth token
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          allRequests.push(...data);
        }
      } catch (roleError) {
        console.error(`Error fetching for role ${role}:`, roleError);
      }
    }

    const uniqueRequests = allRequests.filter((request, index, self) =>
      index === self.findIndex(r => r.id === request.id)
    );

    return NextResponse.json({
      success: true,
      requests: uniqueRequests,
      totalCount: uniqueRequests.length
    });

  } catch (error) {
    console.error("Inbox API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch inbox" },
      { status: 500 }
    );
  }
}