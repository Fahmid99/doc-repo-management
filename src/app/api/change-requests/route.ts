import { NextRequest, NextResponse } from "next/server";
import { ChangeRequest } from "@/app/library/types/changeRequest";
const BASE_URL = process.env.BASE_URL;

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "No authorization header" },
        { status: 401 }
      );
    }
    const body = await request.json();
    const response = await fetch(
      `${BASE_URL}/dms/create/crchangerequestnewdoc?parentType=crchangerequestnewdoc&parenttype=sysfolder&keeplock=false`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "Failed to create change request" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(
      {
        success: true,
        data: data,
        message: "Change request created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating change request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
