"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import DataTable, { type DataTableConfig, type DataRow } from "@/components/data-search/data-table"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 샘플 국회의원 활동 데이터
const sampleMembersData: DataRow[] = [
  {
    id: "1",
    name: "김철수",
    party: "더불어민주당",
    constituency: "서울 강남구 갑",
    committee: "기획재정위원회",
    term: "21대",
    bills_proposed: 15,
    bills_passed: 8,
    attendance_rate: 95.2,
    speech_count: 42,
    question_count: 28,
    last_activity: "2024-02-15",
  },
  {
    id: "2",
    name: "이영희",
    party: "국민의힘",
    constituency: "부산 해운대구 을",
    committee: "교육위원회",
    term: "21대",
    bills_proposed: 22,
    bills_passed: 12,
    attendance_rate: 98.7,
    speech_count: 38,
    question_count: 35,
    last_activity: "2024-02-14",
  },
  {
    id: "3",
    name: "박민수",
    party: "더불어민주당",
    constituency: "경기 성남시 분당구 갑",
    committee: "과학기술정보방송통신위원회",
    term: "21대",
    bills_proposed: 18,
    bills_passed: 10,
    attendance_rate: 92.1,
    speech_count: 55,
    question_count: 41,
    last_activity: "2024-02-13",
  },
  {
    id: "4",
    name: "정수진",
    party: "국민의힘",
    constituency: "대구 수성구 갑",
    committee: "보건복지위원회",
    term: "21대",
    bills_proposed: 25,
    bills_passed: 15,
    attendance_rate: 96.8,
    speech_count: 31,
    question_count: 22,
    last_activity: "2024-02-12",
  },
  {
    id: "5",
    name: "최동훈",
    party: "정의당",
    constituency: "비례대표",
    committee: "환경노동위원회",
    term: "21대",
    bills_proposed: 12,
    bills_passed: 5,
    attendance_rate: 94.3,
    speech_count: 67,
    question_count: 52,
    last_activity: "2024-02-11",
  },
]

export default function MembersSearchPage() {
  const { user, loading: authLoading, isConfigured } = useAuth()
  const { toast } = useToast()
  const [data, setData] = useState<DataRow[]>([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState("attendance_rate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [filters, setFilters] = useState<Record<string, string>>({})

  const tableConfig: DataTableConfig = {
    title: "국회의원 활동 데이터 검색",
    description: "국회의원들의 입법 활동, 출석률, 발언 기록 등을 상세하게 검색하고 분석할 수 있습니다.",
    searchPlaceholder: "의원명, 지역구, 위원회명 검색...",
    defaultSortColumn: "attendance_rate",
    defaultSortDirection: "desc",
    pageSize: 15,
    exportable: true,
    columns: [
      {
        key: "name",
        label: "의원명",
        type: "text",
        searchable: true,
        sortable: true,
      },
      {
        key: "party",
        label: "소속정당",
        type: "badge",
        filterable: true,
        filterOptions: ["더불어민주당", "국민의힘", "정의당", "국민의당", "기본소득당"],
      },
      {
        key: "constituency",
        label: "지역구",
        type: "text",
        searchable: true,
      },
      {
        key: "committee",
        label: "소속위원회",
        type: "text",
        searchable: true,
        filterable: true,
        filterOptions: [
          "기획재정위원회",
          "교육위원회",
          "과학기술정보방송통신위원회",
          "보건복지위원회",
          "환경노동위원회",
          "국정감사위원회",
        ],
      },
      {
        key: "bills_proposed",
        label: "발의 법안 수",
        type: "number",
        sortable: true,
      },
      {
        key: "bills_passed",
        label: "통과 법안 수",
        type: "number",
        sortable: true,
      },
      {
        key: "attendance_rate",
        label: "출석률 (%)",
        type: "number",
        sortable: true,
      },
      {
        key: "speech_count",
        label: "발언 횟수",
        type: "number",
        sortable: true,
      },
      {
        key: "last_activity",
        label: "최근 활동일",
        type: "date",
        sortable: true,
      },
    ],
  }

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user, currentPage, searchQuery, sortColumn, sortDirection, filters])

  const fetchData = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      let filteredData = [...sampleMembersData]

      // 검색 필터링
      if (searchQuery) {
        filteredData = filteredData.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.constituency.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.committee.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      // 추가 필터링
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") {
          filteredData = filteredData.filter((item) => item[key] === value)
        }
      })

      // 정렬
      filteredData.sort((a, b) => {
        const aValue = a[sortColumn]
        const bValue = b[sortColumn]
        const modifier = sortDirection === "asc" ? 1 : -1

        if (typeof aValue === "number" && typeof bValue === "number") {
          return (aValue - bValue) * modifier
        }

        if (aValue < bValue) return -1 * modifier
        if (aValue > bValue) return 1 * modifier
        return 0
      })

      setTotalCount(filteredData.length)

      const startIndex = (currentPage - 1) * tableConfig.pageSize!
      const endIndex = startIndex + tableConfig.pageSize!
      setData(filteredData.slice(startIndex, endIndex))
    } catch (error) {
      toast({
        title: "데이터 로딩 실패",
        description: "국회의원 활동 데이터를 불러오는 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleSort = (column: string, direction: "asc" | "desc") => {
    setSortColumn(column)
    setSortDirection(direction)
    setCurrentPage(1)
  }

  const handleFilter = (newFilters: Record<string, string>) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleExport = () => {
    const csvContent = [
      tableConfig.columns.map((col) => col.label).join(","),
      ...data.map((row) =>
        tableConfig.columns
          .map((col) => {
            const value = row[col.key]
            return typeof value === "string" && value.includes(",") ? `"${value}"` : value
          })
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `국회의원활동_검색결과_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">로딩 중...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>로그인이 필요합니다</CardTitle>
            <CardDescription>국회의원 활동 데이터 검색 서비스를 이용하려면 먼저 로그인해주세요.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {!isConfigured && (
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            현재 데모 모드입니다. 표시되는 국회의원 활동 데이터는 샘플 데이터이며, 실제 국회 데이터베이스 연동을
            위해서는 Supabase 설정이 필요합니다.
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">국회의원 활동 데이터 검색</h1>
        <p className="text-muted-foreground">
          국회의원들의 입법 활동, 출석률, 발언 기록, 위원회 활동 등을 상세하게 검색하고 분석할 수 있습니다.
          {!isConfigured && " (현재 샘플 데이터 표시 중)"}
        </p>
      </div>

      <DataTable
        config={tableConfig}
        data={data}
        loading={loading}
        totalCount={totalCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onSort={handleSort}
        onFilter={handleFilter}
        onExport={handleExport}
      />
    </div>
  )
}
