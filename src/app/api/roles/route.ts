import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/app/library/types/role";
const BASE_URL = process.env.BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "No authorization header" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${BASE_URL}/organization/role?orgobjects=true`,
      {
        method: "GET",
        headers: {
          Authorization: authHeader,
        },
      }
    );

    const data = await response.json();

    const rolesObj = data.map((role: Role) => ({
      id: role.id,
      name: role.name,
    }));

    return NextResponse.json({ roles: rolesObj }, { status: 200 });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
