import {
  redisClient,
  getSearchStatsKey,
  getDownloadStatsKey,
  getSearchCountersKey,
  getDownloadCountersKey,
  isRedisConfigured,
} from "./redis"

export interface SearchStats {
  totalSearches: number
  uniqueQueries: number
  popularQueries: Array<{ query: string; count: number }>
}

export interface DownloadStats {
  totalDownloads: number
  popularDatasets: Array<{ dataset: string; count: number }>
  categoryStats: Record<string, number>
}

export interface DashboardStats {
  searchStats: SearchStats
  downloadStats: DownloadStats
  isDemo: boolean
}

// 검색 통계 기록
export async function trackSearch(query: string, category?: string): Promise<void> {
  if (!query.trim()) return

  try {
    const cleanQuery = query.toLowerCase().trim()

    // 일일 검색 수 증가
    await redisClient.incr(getSearchStatsKey("daily"))

    // 검색어별 카운터 증가 (Hash 사용)
    await redisClient.hincrby(getSearchCountersKey(), cleanQuery, 1)

    // 카테고리별 검색 통계 (선택사항)
    if (category) {
      await redisClient.incr(`search:category:${category}:${getSearchStatsKey("daily")}`)
    }

    // 검색어 카운터는 30일 후 만료
    await redisClient.expire(getSearchCountersKey(), 30 * 24 * 60 * 60)
  } catch (error) {
    console.error("Failed to track search:", error)
  }
}

// 다운로드 통계 기록
export async function trackDownload(datasetId: string, category: string, format: string): Promise<void> {
  try {
    // 일일 다운로드 수 증가
    await redisClient.incr(getDownloadStatsKey("daily"))

    // 데이터셋별 카운터 증가 (Hash 사용)
    await redisClient.hincrby(getDownloadCountersKey(), `${category}:${datasetId}`, 1)

    // 카테고리별 다운로드 통계
    await redisClient.incr(`download:category:${category}:${getDownloadStatsKey("daily")}`)

    // 형식별 다운로드 통계
    await redisClient.incr(`download:format:${format}:${getDownloadStatsKey("daily")}`)

    // 다운로드 카운터는 30일 후 만료
    await redisClient.expire(getDownloadCountersKey(), 30 * 24 * 60 * 60)
  } catch (error) {
    console.error("Failed to track download:", error)
  }
}

// 검색 통계 조회
export async function getSearchStats(): Promise<SearchStats> {
  try {
    const [totalSearchesStr, searchCounters] = await Promise.all([
      redisClient.get(getSearchStatsKey("daily")),
      redisClient.hgetall(getSearchCountersKey()),
    ])

    const totalSearches = Number.parseInt(totalSearchesStr || "0")

    // 검색어별 카운트를 배열로 변환하고 정렬
    const popularQueries = Object.entries(searchCounters || {})
      .map(([query, countStr]) => ({
        query,
        count: Number.parseInt(countStr),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return {
      totalSearches,
      uniqueQueries: popularQueries.length,
      popularQueries: popularQueries.slice(0, 5),
    }
  } catch (error) {
    console.error("Failed to get search stats:", error)
    // 데모 데이터 반환
    return {
      totalSearches: 1247,
      uniqueQueries: 89,
      popularQueries: [
        { query: "예산", count: 156 },
        { query: "판결문", count: 134 },
        { query: "국회의원", count: 98 },
        { query: "정책", count: 76 },
        { query: "재산공개", count: 45 },
      ],
    }
  }
}

// 다운로드 통계 조회
export async function getDownloadStats(): Promise<DownloadStats> {
  try {
    const [totalDownloadsStr, downloadCounters, executiveDownloads, legislativeDownloads, judicialDownloads] =
      await Promise.all([
        redisClient.get(getDownloadStatsKey("daily")),
        redisClient.hgetall(getDownloadCountersKey()),
        redisClient.get(`download:category:executive:${getDownloadStatsKey("daily")}`),
        redisClient.get(`download:category:legislative:${getDownloadStatsKey("daily")}`),
        redisClient.get(`download:category:judicial:${getDownloadStatsKey("daily")}`),
      ])

    const totalDownloads = Number.parseInt(totalDownloadsStr || "0")

    // 데이터셋별 카운트를 배열로 변환하고 정렬
    const popularDatasets = Object.entries(downloadCounters || {})
      .map(([datasetKey, countStr]) => ({
        dataset: datasetKey.split(":")[1] || datasetKey,
        count: Number.parseInt(countStr),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // 카테고리별 통계
    const categoryStats = {
      executive: Number.parseInt(executiveDownloads || "0"),
      legislative: Number.parseInt(legislativeDownloads || "0"),
      judicial: Number.parseInt(judicialDownloads || "0"),
    }

    return {
      totalDownloads,
      popularDatasets,
      categoryStats,
    }
  } catch (error) {
    console.error("Failed to get download stats:", error)
    // 데모 데이터 반환
    return {
      totalDownloads: 892,
      popularDatasets: [
        { dataset: "budget", count: 234 },
        { dataset: "judgments", count: 189 },
        { dataset: "members", count: 156 },
        { dataset: "policy", count: 123 },
        { dataset: "property", count: 98 },
      ],
      categoryStats: {
        executive: 345,
        legislative: 298,
        judicial: 249,
      },
    }
  }
}

// 대시보드용 통합 통계
export async function getDashboardStats(): Promise<DashboardStats> {
  const [searchStats, downloadStats] = await Promise.all([getSearchStats(), getDownloadStats()])

  return {
    searchStats,
    downloadStats,
    isDemo: !isRedisConfigured,
  }
}

// 통계 초기화 (개발/테스트용)
export async function resetStats(): Promise<void> {
  if (!isRedisConfigured) return

  try {
    const keys = [
      getSearchStatsKey("daily"),
      getDownloadStatsKey("daily"),
      getSearchCountersKey(),
      getDownloadCountersKey(),
      `download:category:executive:${getDownloadStatsKey("daily")}`,
      `download:category:legislative:${getDownloadStatsKey("daily")}`,
      `download:category:judicial:${getDownloadStatsKey("daily")}`,
    ]

    // 모든 통계 키 삭제
    await Promise.all(keys.map((key) => redisClient.set(key, "0")))
  } catch (error) {
    console.error("Failed to reset stats:", error)
  }
}

// 샘플 데이터 생성 (개발/테스트용)
export async function generateSampleStats(): Promise<void> {
  if (!isRedisConfigured) return

  try {
    // 샘플 검색 데이터
    const sampleSearches = ["예산", "판결문", "국회의원", "정책", "재산공개", "회의록", "사법통계"]
    for (const query of sampleSearches) {
      const count = Math.floor(Math.random() * 100) + 10
      await redisClient.hincrby(getSearchCountersKey(), query, count)
    }

    // 샘플 다운로드 데이터
    const sampleDatasets = [
      "executive:budget",
      "judicial:judgments",
      "legislative:members",
      "executive:policy",
      "executive:property",
    ]
    for (const dataset of sampleDatasets) {
      const count = Math.floor(Math.random() * 50) + 5
      await redisClient.hincrby(getDownloadCountersKey(), dataset, count)
    }

    // 일일 통계
    await redisClient.set(getSearchStatsKey("daily"), Math.floor(Math.random() * 1000) + 500)
    await redisClient.set(getDownloadStatsKey("daily"), Math.floor(Math.random() * 500) + 200)

    // 카테고리별 다운로드
    await redisClient.set(
      `download:category:executive:${getDownloadStatsKey("daily")}`,
      Math.floor(Math.random() * 200) + 100,
    )
    await redisClient.set(
      `download:category:legislative:${getDownloadStatsKey("daily")}`,
      Math.floor(Math.random() * 150) + 80,
    )
    await redisClient.set(
      `download:category:judicial:${getDownloadStatsKey("daily")}`,
      Math.floor(Math.random() * 120) + 60,
    )

    console.log("Sample stats generated successfully")
  } catch (error) {
    console.error("Failed to generate sample stats:", error)
  }
}
