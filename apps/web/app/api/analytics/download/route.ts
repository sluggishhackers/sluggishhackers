import { type NextRequest, NextResponse } from "next/server"
import { trackDownload } from "@/lib/analytics"

export async function POST(request: NextRequest) {
  try {
    const { datasetId, category, format } = await request.json()

    if (!datasetId || !category || !format) {
      return NextResponse.json({ error: "datasetId, category, and format are required" }, { status: 400 })
    }

    await trackDownload(datasetId, category, format)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Download tracking error:", error)
    return NextResponse.json({ error: "Failed to track download" }, { status: 500 })
  }
}
