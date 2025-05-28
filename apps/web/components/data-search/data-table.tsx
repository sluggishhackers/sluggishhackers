"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Search, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export interface DataColumn {
  key: string
  label: string
  type: "text" | "date" | "number" | "badge"
  searchable?: boolean
  sortable?: boolean
  filterable?: boolean
  filterOptions?: string[]
}

export interface DataRow {
  id: string
  [key: string]: any
}

export interface DataTableConfig {
  title: string
  description: string
  columns: DataColumn[]
  searchPlaceholder?: string
  defaultSortColumn?: string
  defaultSortDirection?: "asc" | "desc"
  pageSize?: number
  exportable?: boolean
}

interface DataTableProps {
  config: DataTableConfig
  data: DataRow[]
  loading?: boolean
  totalCount: number
  currentPage: number
  onPageChange: (page: number) => void
  onSearch: (query: string) => void
  onSort: (column: string, direction: "asc" | "desc") => void
  onFilter: (filters: Record<string, string>) => void
  onExport?: () => void
}

export default function DataTable({
  config,
  data,
  loading = false,
  totalCount,
  currentPage,
  onPageChange,
  onSearch,
  onSort,
  onFilter,
  onExport,
}: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState(config.defaultSortColumn || "")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(config.defaultSortDirection || "desc")
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [selectedRow, setSelectedRow] = useState<DataRow | null>(null)
  const { toast } = useToast()

  const pageSize = config.pageSize || 20
  const totalPages = Math.ceil(totalCount / pageSize)

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchQuery)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchQuery, onSearch])

  useEffect(() => {
    onFilter(filters)
  }, [filters, onFilter])

  const handleSort = (column: string) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc"
    setSortColumn(column)
    setSortDirection(newDirection)
    onSort(column, newDirection)
  }

  const handleFilterChange = (column: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [column]: value,
    }))
  }

  const formatCellValue = (value: any, column: DataColumn) => {
    if (value === null || value === undefined) return "-"

    switch (column.type) {
      case "date":
        return new Date(value).toLocaleDateString("ko-KR")
      case "number":
        if (typeof value === "number") {
          // 예산액처럼 큰 숫자는 억/조 단위로 표시
          if (column.key === "budget_amount" && value >= 100000000) {
            if (value >= 1000000000000) {
              return `${(value / 1000000000000).toFixed(1)}조원`
            } else if (value >= 100000000) {
              return `${(value / 100000000).toFixed(1)}억원`
            }
          }
          // 퍼센트 값
          if (column.key.includes("rate")) {
            return `${value.toFixed(1)}%`
          }
          return value.toLocaleString()
        }
        return value
      case "badge":
        return <Badge variant="secondary">{value}</Badge>
      default:
        return value
    }
  }

  const handleExport = () => {
    if (onExport) {
      onExport()
      toast({
        title: "데이터 내보내기",
        description: "데이터를 내보내는 중입니다...",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{config.title}</CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </div>
          {config.exportable && (
            <Button onClick={handleExport} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              내보내기
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* 검색 및 필터 영역 */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={config.searchPlaceholder || "검색..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {config.columns
                .filter((col) => col.filterable)
                .map((column) => (
                  <Select
                    key={column.key}
                    value={filters[column.key] || "all"}
                    onValueChange={(value) => handleFilterChange(column.key, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder={`${column.label} 필터`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      {column.filterOptions?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}
            </div>
          </div>
        </div>

        {/* 결과 요약 */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            총 {totalCount.toLocaleString()}개의 결과 중 {((currentPage - 1) * pageSize + 1).toLocaleString()}-
            {Math.min(currentPage * pageSize, totalCount).toLocaleString()}개 표시
          </p>
        </div>

        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                {config.columns.map((column) => (
                  <th key={column.key} className="text-left p-3 font-medium">
                    {column.sortable ? (
                      <Button
                        variant="ghost"
                        onClick={() => handleSort(column.key)}
                        className="p-0 h-auto font-medium hover:bg-transparent"
                      >
                        {column.label}
                        {sortColumn === column.key && (
                          <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                        )}
                      </Button>
                    ) : (
                      column.label
                    )}
                  </th>
                ))}
                <th className="text-left p-3 font-medium">액션</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={config.columns.length + 1} className="text-center p-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="ml-2">로딩 중...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={config.columns.length + 1} className="text-center p-8 text-muted-foreground">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-muted/50">
                    {config.columns.map((column) => (
                      <td key={column.key} className="p-3">
                        {formatCellValue(row[column.key], column)}
                      </td>
                    ))}
                    <td className="p-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedRow(row)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>상세 정보</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            {config.columns.map((column) => (
                              <div key={column.key}>
                                <Label className="font-semibold">{column.label}</Label>
                                <div className="mt-1 p-2 bg-muted rounded">
                                  {formatCellValue(row[column.key], column)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              페이지 {currentPage} / {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
                이전
              </Button>

              {/* 페이지 번호 */}
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                  if (pageNum > totalPages) return null

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => onPageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                다음
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
