import { NextRequest, NextResponse } from "next/server";
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

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("type")?.trim();

    if (!category) {
      return NextResponse.json(
        { error: "Missing 'type' parameter" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${BASE_URL}/system/type/name/crchangerequestnewdoc?elements=true&baseparameter=false&embedcs=true&_alllocales=false`,
      {
        headers: { Authorization: authHeader },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch dropdown`);
    }

    const data = await response.json();
    const elements = data.elements || [];

    // Find matching element
    const matchingElement = elements.find((el: any) => 
      el.name === category || el.name?.toLowerCase() === category.toLowerCase()
    );

    if (!matchingElement) {
      return NextResponse.json(
        { error: `No element found for type: ${category}` },
        { status: 404 }
      );
    }

    // Extract entries from codesystem
    const entries = matchingElement.codesystem?.entries || [];

    return NextResponse.json({ 
      entries,
      debug: {
        requested: category,
        found: matchingElement.name,
        entriesCount: entries.length
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Dropdown API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dropdown data" },
      { status: 500 }
    );
  }
}