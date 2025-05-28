import { Redis } from "@upstash/redis"

// Upstash Redis 무료 플랜 사용 (환경변수가 없을 경우 더미 객체 반환)
const redis =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    ? new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
    : null

// Redis가 설정되지 않은 경우를 위한 더미 구현
const dummyRedis = {
  async incr(key: string): Promise<number> {
    return Math.floor(Math.random() * 1000) + 1
  },
  async get(key: string): Promise<string | null> {
    return Math.floor(Math.random() * 1000).toString()
  },
  async set(key: string, value: any): Promise<string> {
    return "OK"
  },
  async zadd(key: string, ...args: any[]): Promise<number> {
    return 1
  },
  async zrevrange(key: string, start: number, stop: number, options?: any): Promise<string[]> {
    return ["sample1", "sample2", "sample3"]
  },
  async zrevrangebyscore(key: string, max: string, min: string, options?: any): Promise<string[]> {
    return ["sample1", "sample2"]
  },
  async zrevrangeWithScores(
    key: string,
    start: number,
    stop: number,
  ): Promise<Array<{ member: string; score: number }>> {
    return [
      { member: "sample1", score: 100 },
      { member: "sample2", score: 80 },
      { member: "sample3", score: 60 },
    ]
  },
  async expire(key: string, seconds: number): Promise<number> {
    return 1
  },
  async hincrby(key: string, field: string, increment: number): Promise<number> {
    return increment
  },
  async hgetall(key: string): Promise<Record<string, string>> {
    return {
      field1: "10",
      field2: "20",
      field3: "30",
    }
  },
}

export const redisClient = redis || dummyRedis
export const isRedisConfigured = !!redis

// 통계 키 생성 함수들
export const getSearchStatsKey = (period: "daily" | "weekly" | "monthly" = "daily") => {
  const now = new Date()
  switch (period) {
    case "daily":
      return `search:stats:${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
    case "weekly":
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
      return `search:stats:week:${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, "0")}-${String(weekStart.getDate()).padStart(2, "0")}`
    case "monthly":
      return `search:stats:${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  }
}

export const getDownloadStatsKey = (period: "daily" | "weekly" | "monthly" = "daily") => {
  const now = new Date()
  switch (period) {
    case "daily":
      return `download:stats:${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
    case "weekly":
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
      return `download:stats:week:${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, "0")}-${String(weekStart.getDate()).padStart(2, "0")}`
    case "monthly":
      return `download:stats:${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  }
}

export const getPopularSearchesKey = () => "popular:searches"
export const getPopularDatasetsKey = () => "popular:datasets"
export const getSearchCountersKey = () => "search:counters"
export const getDownloadCountersKey = () => "download:counters"
