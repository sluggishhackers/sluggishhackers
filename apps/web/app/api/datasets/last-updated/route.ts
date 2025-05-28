import { NextResponse, type NextRequest } from "next/server"
import { getDatasetLastUpdated, getBulkDatasetLastUpdated } from "@/lib/dataset-updates"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const categoryId = searchParams.get("category")
  const datasetId = searchParams.get("dataset")

  // 단일 데이터셋 조회
  if (categoryId && datasetId) {
    const lastUpdated = await getDatasetLastUpdated(categoryId, datasetId)

    return NextResponse.json({
      success: true,
      data: {
        categoryId,
        datasetId,
        lastUpdated: lastUpdated ? lastUpdated.toISOString() : null,
      },
    })
  }

  // 여러 데이터셋 일괄 조회 (datasets=category1:dataset1,category2:dataset2)
  const datasetsParam = searchParams.get("datasets")
  if (datasetsParam) {
    const datasetPairs = datasetsParam.split(",").map((pair) => {
      const [categoryId, datasetId] = pair.split(":")
      return { categoryId, datasetId }
    })

    const results = await getBulkDatasetLastUpdated(datasetPairs)

    return NextResponse.json({
      success: true,
      data: Object.entries(results).reduce(
        (acc, [key, date]) => {
          acc[key] = date ? date.toISOString() : null
          return acc
        },
        {} as Record<string, string | null>,
      ),
    })
  }

  return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
}
