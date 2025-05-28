export interface DataCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  datasetCount: number
  datasets: Dataset[]
}

export interface Dataset {
  id: string
  name: string
  description: string
  category: string
  source: string
  collectionMethod: string
  updateFrequency: string
  lastUpdated: string
  recordCount: string
  size: string
  formats: string[]
  hasSearch: boolean // 사이트 내 검색 가능 여부
  searchUrl?: string
  apiUrl: string
  downloadUrl: string
  tags: string[]
  featured?: boolean
}

export const dataCategories: DataCategory[] = [
  {
    id: "executive",
    name: "행정부",
    description: "정부 부처 및 산하기관의 정책, 예산, 조직 관련 데이터",
    icon: "Building2",
    color: "bg-blue-500",
    datasetCount: 12,
    datasets: [
      {
        id: "budget",
        name: "국가 예산안 및 세출 예산",
        description:
          "대한민국 정부의 연도별, 부처별, 사업별 예산 편성 및 집행 데이터입니다. 국가재정의 투명성을 높이고 예산 사용 현황을 추적할 수 있습니다.",
        category: "executive",
        source: "기획재정부, 열린재정",
        collectionMethod: "정부 예산안 및 결산서에서 추출, 월별 집행 현황 업데이트",
        updateFrequency: "월 1회",
        lastUpdated: "2024-02-15",
        recordCount: "500,000+",
        size: "45.2 MB",
        formats: ["CSV", "JSON", "Excel"],
        hasSearch: true,
        searchUrl: "/search-data/budget",
        apiUrl: "/api/executive/budget",
        downloadUrl: "/datasets/executive/budget",
        tags: ["예산", "재정", "정부지출", "부처별"],
        featured: true,
      },
      {
        id: "policy",
        name: "정책 입안 및 행정예고 현황",
        description: "정부 정책의 입안 과정과 행정예고 현황을 담은 데이터입니다.",
        category: "executive",
        source: "국무조정실, 각 부처",
        collectionMethod: "정부 정책정보 시스템에서 수집",
        updateFrequency: "주 1회",
        lastUpdated: "2024-02-10",
        recordCount: "150,000+",
        size: "32.7 MB",
        formats: ["CSV", "JSON"],
        hasSearch: false,
        apiUrl: "/api/executive/policy",
        downloadUrl: "/datasets/executive/policy",
        tags: ["정책", "행정예고", "입법"],
      },
      {
        id: "property",
        name: "공직자 재산 공개",
        description: "고위공직자들의 재산 공개 데이터입니다.",
        category: "executive",
        source: "국민권익위원회",
        collectionMethod: "공직자윤리위원회 재산신고서 기반",
        updateFrequency: "년 1회",
        lastUpdated: "2024-01-20",
        recordCount: "25,000+",
        size: "18.5 MB",
        formats: ["CSV", "JSON", "Excel"],
        hasSearch: false,
        apiUrl: "/api/executive/property",
        downloadUrl: "/datasets/executive/property",
        tags: ["재산공개", "공직자", "투명성"],
      },
    ],
  },
  {
    id: "legislative",
    name: "입법부",
    description: "국회의원 활동, 법안, 회의록 등 국회 관련 데이터",
    icon: "Users",
    color: "bg-green-500",
    datasetCount: 8,
    datasets: [
      {
        id: "members",
        name: "국회의원 기본 정보 및 입법 활동 내역",
        description: "국회의원들의 기본 정보와 입법 활동, 출석률, 발언 기록 등을 포함한 종합 데이터입니다.",
        category: "legislative",
        source: "국회사무처, 국회의정활동정보시스템",
        collectionMethod: "국회 공식 기록 및 의정활동 데이터 수집",
        updateFrequency: "일 1회",
        lastUpdated: "2024-02-16",
        recordCount: "300,000+",
        size: "36.8 MB",
        formats: ["CSV", "JSON", "Excel"],
        hasSearch: true,
        searchUrl: "/search-data/members",
        apiUrl: "/api/legislative/members",
        downloadUrl: "/datasets/legislative/members",
        tags: ["국회의원", "입법활동", "출석률", "발언"],
        featured: true,
      },
      {
        id: "minutes",
        name: "회의록 및 발언 기록",
        description: "국회 본회의 및 위원회 회의록과 의원들의 발언 기록입니다.",
        category: "legislative",
        source: "국회사무처",
        collectionMethod: "국회 속기록 및 회의록 디지털화",
        updateFrequency: "일 1회",
        lastUpdated: "2024-02-15",
        recordCount: "1,200,000+",
        size: "125.4 MB",
        formats: ["CSV", "JSON", "Text"],
        hasSearch: false,
        apiUrl: "/api/legislative/minutes",
        downloadUrl: "/datasets/legislative/minutes",
        tags: ["회의록", "발언", "속기록", "위원회"],
      },
    ],
  },
  {
    id: "judicial",
    name: "사법부",
    description: "법원 판결문, 사법 통계 등 사법부 관련 데이터",
    icon: "Scale",
    color: "bg-purple-500",
    datasetCount: 6,
    datasets: [
      {
        id: "judgments",
        name: "판결문 공개 데이터",
        description: "대한민국 각급 법원의 판결문을 수집한 데이터입니다. 사건 유형별, 법원별로 분류되어 있습니다.",
        category: "judicial",
        source: "대법원, 각급 법원",
        collectionMethod: "법원 판결문 공개 시스템에서 수집",
        updateFrequency: "일 1회",
        lastUpdated: "2024-02-16",
        recordCount: "1,250,000+",
        size: "215.8 MB",
        formats: ["CSV", "JSON", "Text"],
        hasSearch: true,
        searchUrl: "/search-data/judgments",
        apiUrl: "/api/judicial/judgments",
        downloadUrl: "/datasets/judicial/judgments",
        tags: ["판결문", "법원", "사건", "판례"],
        featured: true,
      },
      {
        id: "statistics",
        name: "사법 통계 연보",
        description: "법원의 사건 처리 현황, 재판 통계 등을 담은 연간 통계 데이터입니다.",
        category: "judicial",
        source: "대법원 사법정책연구원",
        collectionMethod: "법원 사건관리시스템 통계 집계",
        updateFrequency: "년 1회",
        lastUpdated: "2024-01-30",
        recordCount: "50,000+",
        size: "42.6 MB",
        formats: ["CSV", "JSON", "Excel"],
        hasSearch: false,
        apiUrl: "/api/judicial/statistics",
        downloadUrl: "/datasets/judicial/statistics",
        tags: ["사법통계", "재판", "사건처리"],
      },
    ],
  },
]

export function getDatasetById(categoryId: string, datasetId: string): Dataset | undefined {
  const category = dataCategories.find((cat) => cat.id === categoryId)
  return category?.datasets.find((dataset) => dataset.id === datasetId)
}

export function getAllDatasets(): Dataset[] {
  return dataCategories.flatMap((category) => category.datasets)
}

export function getFeaturedDatasets(): Dataset[] {
  return getAllDatasets().filter((dataset) => dataset.featured)
}
