import { type NextRequest, NextResponse } from "next/server"
import { trackSearch } from "@/lib/analytics"

export async function POST(request: NextRequest) {
  try {
    const { query, category } = await request.json()

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    await trackSearch(query, category)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Search tracking error:", error)
    return NextResponse.json({ error: "Failed to track search" }, { status: 500 })
  }
}
