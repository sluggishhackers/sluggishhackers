export interface SearchItem {
  id: string
  title: string
  description: string
  category: "api" | "dataset" | "page"
  subcategory?: string
  url: string
  keywords: string[]
}

export const searchData: SearchItem[] = [
  // API 검색 데이터
  {
    id: "api-budget",
    title: "국가 예산안 및 세출 예산 API",
    description: "대한민국 정부의 국가 예산안 및 세출 예산 데이터에 접근할 수 있는 API",
    category: "api",
    subcategory: "행정부",
    url: "/api/executive/budget",
    keywords: ["예산", "세출", "국가", "정부", "재정", "budget", "executive"],
  },
  {
    id: "api-policy",
    title: "정책 입안 및 행정예고 현황 API",
    description: "정부 정책 입안 과정과 행정예고 현황을 조회할 수 있는 API",
    category: "api",
    subcategory: "행정부",
    url: "/api/executive/policy",
    keywords: ["정책", "행정예고", "입안", "policy", "executive"],
  },
  {
    id: "api-property",
    title: "공직자 재산 공개 API",
    description: "공직자들의 재산 공개 데이터를 조회할 수 있는 API",
    category: "api",
    subcategory: "행정부",
    url: "/api/executive/property",
    keywords: ["공직자", "재산", "공개", "property", "executive"],
  },
  {
    id: "api-members",
    title: "국회의원 기본 정보 및 입법 활동 내역 API",
    description: "국회의원들의 기본 정보와 입법 활동 내역을 조회할 수 있는 API",
    category: "api",
    subcategory: "입법부",
    url: "/api/legislative/members",
    keywords: ["국회의원", "입법", "활동", "members", "legislative"],
  },
  {
    id: "api-minutes",
    title: "회의록 및 발언 기록 API",
    description: "국회 회의록과 의원들의 발언 기록을 조회할 수 있는 API",
    category: "api",
    subcategory: "입법부",
    url: "/api/legislative/minutes",
    keywords: ["회의록", "발언", "기록", "minutes", "legislative"],
  },
  {
    id: "api-decisions",
    title: "판결문 공개 데이터 API",
    description: "법원의 판결문 공개 데이터를 조회할 수 있는 API",
    category: "api",
    subcategory: "사법부",
    url: "/api/judicial/decisions",
    keywords: ["판결문", "법원", "사법", "decisions", "judicial"],
  },

  // 데이터셋 검색 데이터
  {
    id: "dataset-budget",
    title: "국가 예산안 및 세출 예산 데이터셋",
    description: "2010년부터 현재까지의 국가 예산안 및 세출 예산 데이터",
    category: "dataset",
    subcategory: "행정부",
    url: "/datasets/executive/budget",
    keywords: ["예산", "세출", "데이터셋", "dataset", "budget"],
  },
  {
    id: "dataset-members",
    title: "국회의원 기본 정보 및 입법 활동 내역 데이터셋",
    description: "19대부터 현재까지의 국회의원 기본 정보 및 입법 활동 내역 데이터",
    category: "dataset",
    subcategory: "입법부",
    url: "/datasets/legislative/members",
    keywords: ["국회의원", "입법", "데이터셋", "dataset", "members"],
  },
  {
    id: "dataset-decisions",
    title: "판결문 공개 데이터셋",
    description: "2015년부터 현재까지의 판결문 공개 데이터",
    category: "dataset",
    subcategory: "사법부",
    url: "/datasets/judicial/decisions",
    keywords: ["판결문", "사법", "데이터셋", "dataset", "decisions"],
  },

  // 페이지 검색 데이터
  {
    id: "page-home",
    title: "홈페이지",
    description: "오픈데이터 카버스 커뮤니티 소개 및 주요 데이터 카테고리",
    category: "page",
    url: "/",
    keywords: ["홈", "메인", "소개", "home", "main"],
  },
  {
    id: "page-api",
    title: "API 문서",
    description: "모든 API에 대한 상세 문서와 사용법",
    category: "page",
    url: "/api",
    keywords: ["API", "문서", "documentation", "api"],
  },
  {
    id: "page-datasets",
    title: "데이터셋",
    description: "다운로드 가능한 모든 데이터셋 목록",
    category: "page",
    url: "/datasets",
    keywords: ["데이터셋", "다운로드", "dataset", "download"],
  },
]

export function searchItems(query: string): SearchItem[] {
  if (!query.trim()) return []

  const lowercaseQuery = query.toLowerCase()

  return searchData
    .filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(lowercaseQuery)
      const descriptionMatch = item.description.toLowerCase().includes(lowercaseQuery)
      const keywordMatch = item.keywords.some((keyword) => keyword.toLowerCase().includes(lowercaseQuery))
      const subcategoryMatch = item.subcategory?.toLowerCase().includes(lowercaseQuery)

      return titleMatch || descriptionMatch || keywordMatch || subcategoryMatch
    })
    .sort((a, b) => {
      // 제목에 정확히 일치하는 것을 우선순위로
      const aExactTitle = a.title.toLowerCase().includes(lowercaseQuery)
      const bExactTitle = b.title.toLowerCase().includes(lowercaseQuery)

      if (aExactTitle && !bExactTitle) return -1
      if (!aExactTitle && bExactTitle) return 1

      return 0
    })
}

export function getCategoryIcon(category: SearchItem["category"]) {
  switch (category) {
    case "api":
      return "FileJson"
    case "dataset":
      return "Database"
    case "page":
      return "FileText"
    default:
      return "Search"
  }
}

export function getCategoryLabel(category: SearchItem["category"]) {
  switch (category) {
    case "api":
      return "API"
    case "dataset":
      return "데이터셋"
    case "page":
      return "페이지"
    default:
      return ""
  }
}
