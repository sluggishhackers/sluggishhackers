"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import DataTable, { type DataTableConfig, type DataRow } from "@/components/data-search/data-table"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 샘플 예산 데이터 (실제로는 Supabase에서 가져옴)
const sampleBudgetData: DataRow[] = [
  {
    id: "1",
    year: 2023,
    ministry_code: "1310000",
    ministry_name: "과학기술정보통신부",
    program_code: "1311-100",
    program_name: "과학기술 연구개발",
    project_code: "1311-100-01",
    project_name: "기초과학 연구지원",
    budget_amount: 2500000000000,
    previous_year_budget: 2300000000000,
    change_rate: 8.7,
    execution_rate: 95.2,
  },
  {
    id: "2",
    year: 2023,
    ministry_code: "1310000",
    ministry_name: "과학기술정보통신부",
    program_code: "1311-200",
    program_name: "정보통신 인프라",
    project_code: "1311-200-01",
    project_name: "5G 네트워크 구축",
    budget_amount: 1800000000000,
    previous_year_budget: 1500000000000,
    change_rate: 20.0,
    execution_rate: 87.5,
  },
  {
    id: "3",
    year: 2023,
    ministry_code: "1320000",
    ministry_name: "교육부",
    program_code: "1321-100",
    program_name: "초중등교육",
    project_code: "1321-100-01",
    project_name: "교육과정 운영",
    budget_amount: 15000000000000,
    previous_year_budget: 14200000000000,
    change_rate: 5.6,
    execution_rate: 98.1,
  },
  {
    id: "4",
    year: 2023,
    ministry_code: "1320000",
    ministry_name: "교육부",
    program_code: "1321-200",
    program_name: "고등교육",
    project_code: "1321-200-01",
    project_name: "국립대학 운영",
    budget_amount: 8500000000000,
    previous_year_budget: 8100000000000,
    change_rate: 4.9,
    execution_rate: 96.3,
  },
  {
    id: "5",
    year: 2023,
    ministry_code: "1330000",
    ministry_name: "국방부",
    program_code: "1331-100",
    program_name: "방위력 개선",
    project_code: "1331-100-01",
    project_name: "차세대 전투기 도입",
    budget_amount: 3200000000000,
    previous_year_budget: 2800000000000,
    change_rate: 14.3,
    execution_rate: 92.7,
  },
  {
    id: "6",
    year: 2022,
    ministry_code: "1310000",
    ministry_name: "과학기술정보통신부",
    program_code: "1311-100",
    program_name: "과학기술 연구개발",
    project_code: "1311-100-01",
    project_name: "기초과학 연구지원",
    budget_amount: 2300000000000,
    previous_year_budget: 2100000000000,
    change_rate: 9.5,
    execution_rate: 94.8,
  },
  {
    id: "7",
    year: 2024,
    ministry_code: "1340000",
    ministry_name: "보건복지부",
    program_code: "1341-100",
    program_name: "보건의료",
    project_code: "1341-100-01",
    project_name: "국민건강보험 지원",
    budget_amount: 45000000000000,
    previous_year_budget: 42000000000000,
    change_rate: 7.1,
    execution_rate: 99.2,
  },
  {
    id: "8",
    year: 2024,
    ministry_code: "1350000",
    ministry_name: "환경부",
    program_code: "1351-100",
    program_name: "환경보전",
    project_code: "1351-100-01",
    project_name: "탄소중립 정책 추진",
    budget_amount: 1200000000000,
    previous_year_budget: 900000000000,
    change_rate: 33.3,
    execution_rate: 85.4,
  },
]

export default function BudgetSearchPage() {
  const { user, loading: authLoading, isConfigured } = useAuth()
  const { toast } = useToast()
  const [data, setData] = useState<DataRow[]>([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState("year")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [filters, setFilters] = useState<Record<string, string>>({})

  const tableConfig: DataTableConfig = {
    title: "국가 예산안 및 세출 예산 검색",
    description: "정부 부처별, 사업별, 연도별 예산 데이터를 상세하게 검색하고 분석할 수 있습니다.",
    searchPlaceholder: "부처명, 사업명, 프로그램명 검색...",
    defaultSortColumn: "year",
    defaultSortDirection: "desc",
    pageSize: 15,
    exportable: true,
    columns: [
      {
        key: "year",
        label: "연도",
        type: "number",
        sortable: true,
        filterable: true,
        filterOptions: ["2024", "2023", "2022", "2021"],
      },
      {
        key: "ministry_name",
        label: "부처명",
        type: "text",
        searchable: true,
        filterable: true,
        filterOptions: [
          "과학기술정보통신부",
          "교육부",
          "국방부",
          "보건복지부",
          "환경부",
          "기획재정부",
          "외교부",
          "법무부",
        ],
      },
      {
        key: "program_name",
        label: "프로그램명",
        type: "text",
        searchable: true,
      },
      {
        key: "project_name",
        label: "사업명",
        type: "text",
        searchable: true,
      },
      {
        key: "budget_amount",
        label: "예산액 (원)",
        type: "number",
        sortable: true,
      },
      {
        key: "change_rate",
        label: "전년대비 증감률 (%)",
        type: "number",
        sortable: true,
      },
      {
        key: "execution_rate",
        label: "집행률 (%)",
        type: "number",
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
      // 실제로는 Supabase에서 데이터를 가져옴
      await new Promise((resolve) => setTimeout(resolve, 500)) // 로딩 시뮬레이션

      let filteredData = [...sampleBudgetData]

      // 검색 필터링
      if (searchQuery) {
        filteredData = filteredData.filter(
          (item) =>
            item.ministry_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.program_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.project_name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      // 추가 필터링
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") {
          if (key === "year") {
            filteredData = filteredData.filter((item) => item[key].toString() === value)
          } else {
            filteredData = filteredData.filter((item) => item[key] === value)
          }
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

      // 페이지네이션
      const startIndex = (currentPage - 1) * tableConfig.pageSize!
      const endIndex = startIndex + tableConfig.pageSize!
      setData(filteredData.slice(startIndex, endIndex))
    } catch (error) {
      toast({
        title: "데이터 로딩 실패",
        description: "예산 데이터를 불러오는 중 오류가 발생했습니다.",
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
            if (col.key === "budget_amount") {
              return value.toLocaleString()
            }
            return typeof value === "string" && value.includes(",") ? `"${value}"` : value
          })
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `예산데이터_검색결과_${new Date().toISOString().split("T")[0]}.csv`
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
            <CardDescription>예산 데이터 검색 서비스를 이용하려면 먼저 로그인해주세요.</CardDescription>
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
            현재 데모 모드입니다. 표시되는 예산 데이터는 샘플 데이터이며, 실제 정부 예산 데이터베이스 연동을 위해서는
            Supabase 설정이 필요합니다.
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">국가 예산 데이터 검색</h1>
        <p className="text-muted-foreground">
          대한민국 정부의 부처별, 사업별, 연도별 예산 데이터를 상세하게 검색하고 분석할 수 있습니다.
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
