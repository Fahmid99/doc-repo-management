import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const username = request.headers.get("x-username");
    const password = request.headers.get("x-password");

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password required" },
        { status: 400 }
      );
    }

    // Create Base64 encoded credentials in the backend
    const base64Credentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );

    console.log("Created Basic Auth for user:", username);

    // Make GET call to your Swagger API with Basic Auth
    const response = await fetch(`${BASE_URL}/organization/whoami`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    });

    if (!response.ok) {
      console.log("Swagger API responded with status:", response.status);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const userData = await response.json();
    console.log("User data retrieved:", userData);
    return NextResponse.json({
      success: true,
      user: userData,
      authCredentials: base64Credentials,
    });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
