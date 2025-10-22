import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/library/types/auth";
const BASE_URL = process.env.BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    const response = await fetch(
      `${BASE_URL}/organization/id/16946E902139449DA3858DF5B2FFFD85?parents=false&ancestors=false&children=true&allelements=false&privileges=false&roles=false&views=false&substitutesOf=false&deputies=false&account=false`,
      {
        method: "GET",
        headers: {
          Authorization: authHeader!,
        },
      }
    );

    const data = await response.json();
    console.log(data);
    const userObj = data.children

   .map((user: User) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
    return NextResponse.json({ users: userObj }, { status: 200 });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
