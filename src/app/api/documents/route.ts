import { NextRequest, NextResponse } from "next/server";
import { Document } from "@/app/library/types/document";
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
      `${BASE_URL}/result/query?type=published&offset=0&limit=-1&header=false&datameta=false`,
      {
        method: "GET",
        headers: {
          Authorization: authHeader,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch documents" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('External API returned:', data); // Debug this
    
    // Check if data is already an array
    if (Array.isArray(data)) {
      return NextResponse.json({ documents: data });
    }
    
    // Check if data has a documents property
    if (data.documents) {
      return NextResponse.json({ documents: data.documents });
    }
    
    // Return whatever structure it has
    return NextResponse.json({ documents: [] });

  } catch (error) {
    console.error("Document API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}