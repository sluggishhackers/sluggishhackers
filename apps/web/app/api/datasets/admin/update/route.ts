import { NextResponse, type NextRequest } from "next/server"
import { setDatasetLastUpdated } from "@/lib/dataset-updates"

export async function POST(request: NextRequest) {
  try {
    const { categoryId, datasetId, date } = await request.json()

    if (!categoryId || !datasetId) {
      return NextResponse.json({ error: "categoryId and datasetId are required" }, { status: 400 })
    }

    const updateDate = date ? new Date(date) : new Date()
    const success = await setDatasetLastUpdated(categoryId, datasetId, updateDate)

    if (success) {
      return NextResponse.json({
        success: true,
        message: `Dataset ${categoryId}:${datasetId} last updated date set to ${updateDate.toISOString()}`,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update dataset last updated date",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error updating dataset:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
