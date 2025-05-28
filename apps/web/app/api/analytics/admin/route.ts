import { type NextRequest, NextResponse } from "next/server"
import { resetStats, generateSampleStats } from "@/lib/analytics"

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()

    switch (action) {
      case "reset":
        await resetStats()
        return NextResponse.json({ success: true, message: "Stats reset successfully" })

      case "generate":
        await generateSampleStats()
        return NextResponse.json({ success: true, message: "Sample stats generated successfully" })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Admin action error:", error)
    return NextResponse.json({ error: "Failed to perform admin action" }, { status: 500 })
  }
}
