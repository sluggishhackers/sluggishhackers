import { redisClient, isRedisConfigured } from "./redis"

// Redis 키 형식: dataset:lastUpdated:{categoryId}:{datasetId}
const getDatasetUpdateKey = (categoryId: string, datasetId: string) => {
  return `dataset:lastUpdated:${categoryId}:${datasetId}`
}

// 데이터셋 업데이트 일자 저장
export async function setDatasetLastUpdated(
  categoryId: string,
  datasetId: string,
  date: Date = new Date(),
): Promise<boolean> {
  try {
    if (!isRedisConfigured) {
      console.warn("Redis is not configured. Using demo mode.")
      return false
    }

    const key = getDatasetUpdateKey(categoryId, datasetId)
    const dateString = date.toISOString()

    await redisClient.set(key, dateString)

    // 키 만료 시간 설정 (1년)
    await redisClient.expire(key, 365 * 24 * 60 * 60)

    return true
  } catch (error) {
    console.error(`Failed to set last updated date for dataset ${categoryId}:${datasetId}:`, error)
    return false
  }
}

// 데이터셋 업데이트 일자 조회
export async function getDatasetLastUpdated(categoryId: string, datasetId: string): Promise<Date | null> {
  try {
    if (!isRedisConfigured) {
      // 데모 모드에서는 랜덤한 최근 날짜 반환
      const demoDate = new Date()
      demoDate.setDate(demoDate.getDate() - Math.floor(Math.random() * 30))
      return demoDate
    }

    const key = getDatasetUpdateKey(categoryId, datasetId)
    const dateString = await redisClient.get(key)

    if (!dateString) {
      return null
    }

    return new Date(dateString)
  } catch (error) {
    console.error(`Failed to get last updated date for dataset ${categoryId}:${datasetId}:`, error)
    return null
  }
}

// 여러 데이터셋의 업데이트 일자 일괄 조회
export async function getBulkDatasetLastUpdated(
  datasets: Array<{ categoryId: string; datasetId: string }>,
): Promise<Record<string, Date | null>> {
  const results: Record<string, Date | null> = {}

  if (!isRedisConfigured) {
    // 데모 모드에서는 랜덤한 최근 날짜 반환
    for (const { categoryId, datasetId } of datasets) {
      const demoDate = new Date()
      demoDate.setDate(demoDate.getDate() - Math.floor(Math.random() * 30))
      results[`${categoryId}:${datasetId}`] = demoDate
    }
    return results
  }

  try {
    // 병렬로 모든 데이터셋의 업데이트 일자 조회
    const promises = datasets.map(async ({ categoryId, datasetId }) => {
      const key = getDatasetUpdateKey(categoryId, datasetId)
      const dateString = await redisClient.get(key)

      results[`${categoryId}:${datasetId}`] = dateString ? new Date(dateString) : null
    })

    await Promise.all(promises)

    return results
  } catch (error) {
    console.error("Failed to get bulk last updated dates:", error)
    return results
  }
}

// 모든 데이터셋의 업데이트 일자 조회
export async function getAllDatasetLastUpdated(): Promise<Record<string, Date | null>> {
  if (!isRedisConfigured) {
    // 데모 모드에서는 빈 객체 반환
    return {}
  }

  try {
    // dataset:lastUpdated: 패턴으로 시작하는 모든 키 조회
    const keys = await redisClient.keys("dataset:lastUpdated:*")
    const results: Record<string, Date | null> = {}

    if (keys.length === 0) {
      return results
    }

    // 모든 키의 값을 병렬로 조회
    const values = await Promise.all(keys.map((key) => redisClient.get(key)))

    // 결과 매핑
    keys.forEach((key, index) => {
      const parts = key.split(":")
      if (parts.length === 4) {
        const categoryId = parts[2]
        const datasetId = parts[3]
        const dateString = values[index]

        results[`${categoryId}:${datasetId}`] = dateString ? new Date(dateString) : null
      }
    })

    return results
  } catch (error) {
    console.error("Failed to get all dataset last updated dates:", error)
    return {}
  }
}
