import { NextRequest, NextResponse } from "next/server";
console.log("MIDDLEWARE FILE LOADED");

const BASE_URL = process.env.BASE_URL;

const authenticateUser = async (request: NextRequest) => {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) return null;

    const response = await fetch(`${BASE_URL}/organization/whoami?parents=false&ancestors=false&children=false&privileges=false&roles=true&views=false&acl=false&account=false`, {
      headers: { Authorization: authHeader },
    });

    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
};

// ✅ Function declaration instead of arrow function
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log(`🛡️ MIDDLEWARE RUNNING for: ${pathname}`);

  if (pathname === "/api/auth/login") {
 
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {

    const userData = await authenticateUser(request);
    
    if (!userData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    
    // ✅ Add the header setting logic
    const response = NextResponse.next();
    response.headers.set("x-user-data", JSON.stringify(userData));
    response.headers.set("x-user-roles", JSON.stringify(userData.effectiveroles || []));
    response.headers.set("x-user-id", userData.id);
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};