"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import DataTable, { type DataTableConfig, type DataRow } from "@/components/data-search/data-table"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

// 샘플 데이터 (실제로는 Supabase에서 가져옴)
const sampleJudgments: DataRow[] = [
  {
    id: "1",
    case_number: "2023가단12345",
    court_name: "서울중앙지방법원",
    judge_name: "김철수",
    case_type: "민사",
    judgment_date: "2023-12-15",
    parties: "홍길동 vs 김영희",
    summary: "임대차계약상 보증금 반환 청구 사건으로, 원고의 청구를 일부 인용함",
    full_text: "주문: 1. 피고는 원고에게 금 500만원 및...",
  },
  {
    id: "2",
    case_number: "2023노987",
    court_name: "서울고등법원",
    judge_name: "이영희",
    case_type: "형사",
    judgment_date: "2023-12-10",
    parties: "검사 vs 박민수",
    summary: "사기죄로 기소된 피고인에 대한 항소심 판결",
    full_text: "주문: 1. 원심판결을 파기한다. 2. 피고인을...",
  },
  // ... 더 많은 샘플 데이터
]

export default function JudgmentsSearchPage() {
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [data, setData] = useState<DataRow[]>([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState("judgment_date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [filters, setFilters] = useState<Record<string, string>>({})

  const tableConfig: DataTableConfig = {
    title: "대한민국 판결문 검색",
    description: "대한민국 법원의 판결문을 검색하고 조회할 수 있습니다.",
    searchPlaceholder: "사건번호, 당사자명, 요약 내용 검색...",
    defaultSortColumn: "judgment_date",
    defaultSortDirection: "desc",
    pageSize: 20,
    exportable: true,
    columns: [
      {
        key: "case_number",
        label: "사건번호",
        type: "text",
        searchable: true,
        sortable: true,
      },
      {
        key: "court_name",
        label: "법원명",
        type: "text",
        searchable: true,
        filterable: true,
        filterOptions: ["서울중앙지방법원", "서울고등법원", "대법원", "부산지방법원", "대구지방법원"],
      },
      {
        key: "case_type",
        label: "사건종류",
        type: "badge",
        filterable: true,
        filterOptions: ["민사", "형사", "행정", "가사"],
      },
      {
        key: "judgment_date",
        label: "선고일",
        type: "date",
        sortable: true,
      },
      {
        key: "parties",
        label: "당사자",
        type: "text",
        searchable: true,
      },
      {
        key: "summary",
        label: "요약",
        type: "text",
        searchable: true,
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
      // 실제로는 Supabase에서 데이터를 가져옴
      // 여기서는 샘플 데이터를 사용
      await new Promise((resolve) => setTimeout(resolve, 500)) // 로딩 시뮬레이션

      let filteredData = [...sampleJudgments]

      // 검색 필터링
      if (searchQuery) {
        filteredData = filteredData.filter(
          (item) =>
            item.case_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.parties.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.summary.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      // 추가 필터링
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          filteredData = filteredData.filter((item) => item[key] === value)
        }
      })

      // 정렬
      filteredData.sort((a, b) => {
        const aValue = a[sortColumn]
        const bValue = b[sortColumn]
        const modifier = sortDirection === "asc" ? 1 : -1

        if (aValue < bValue) return -1 * modifier
        if (aValue > bValue) return 1 * modifier
        return 0
      })

      setTotalCount(filteredData.length)

      // 페이지네이션
      const startIndex = (currentPage - 1) * tableConfig.pageSize!
      const endIndex = startIndex + tableConfig.pageSize!
      setData(filteredData.slice(startIndex, endIndex))
    } catch (error) {
      toast({
        title: "데이터 로딩 실패",
        description: "데이터를 불러오는 중 오류가 발생했습니다.",
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
    // CSV 내보내기 로직
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

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `판결문_검색결과_${new Date().toISOString().split("T")[0]}.csv`
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
            <CardDescription>데이터 검색 서비스를 이용하려면 먼저 로그인해주세요.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">판결문 검색</h1>
        <p className="text-muted-foreground">대한민국 법원의 판결문을 검색하고 상세 내용을 확인할 수 있습니다.</p>
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
