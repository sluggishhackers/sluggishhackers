import { NextResponse } from "next/server"
import { getDashboardStats } from "@/lib/analytics"

export async function GET() {
  try {
    const stats = await getDashboardStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Stats retrieval error:", error)
    return NextResponse.json({ error: "Failed to retrieve stats" }, { status: 500 })
  }
}
