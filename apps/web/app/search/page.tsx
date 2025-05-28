"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { FileJson, Database, FileText, SearchIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SearchComponent from "@/components/search"
import { searchItems, type SearchItem, getCategoryLabel } from "@/lib/search-data"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<SearchItem[]>([])
  const [filteredResults, setFilteredResults] = useState<{
    api: SearchItem[]
    dataset: SearchItem[]
    page: SearchItem[]
  }>({
    api: [],
    dataset: [],
    page: [],
  })

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchItems(query)
      setResults(searchResults)

      // 카테고리별로 결과 분류
      setFilteredResults({
        api: searchResults.filter((item) => item.category === "api"),
        dataset: searchResults.filter((item) => item.category === "dataset"),
        page: searchResults.filter((item) => item.category === "page"),
      })
    } else {
      setResults([])
      setFilteredResults({ api: [], dataset: [], page: [] })
    }
  }, [query])

  const getCategoryIcon = (category: SearchItem["category"]) => {
    switch (category) {
      case "api":
        return <FileJson className="h-5 w-5" />
      case "dataset":
        return <Database className="h-5 w-5" />
      case "page":
        return <FileText className="h-5 w-5" />
      default:
        return <SearchIcon className="h-5 w-5" />
    }
  }

  const renderResults = (items: SearchItem[]) => {
    if (items.length === 0) {
      return <div className="text-center py-8 text-muted-foreground">검색 결과가 없습니다.</div>
    }

    return (
      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="text-muted-foreground">{getCategoryIcon(item.category)}</div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">
                      <Link href={item.url} className="hover:text-primary transition-colors">
                        {item.title}
                      </Link>
                    </CardTitle>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Badge variant="secondary">{getCategoryLabel(item.category)}</Badge>
                  {item.subcategory && <Badge variant="outline">{item.subcategory}</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">{item.description}</CardDescription>
              <div className="mt-2">
                <Link href={item.url} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.url}
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!query.trim()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">검색</h1>
          <p className="text-muted-foreground mb-6">찾고 있는 API, 데이터셋, 또는 페이지를 검색해보세요.</p>
          <div className="max-w-md mx-auto">
            <SearchComponent placeholder="검색어를 입력하세요..." />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">검색 결과</h1>
        <p className="text-muted-foreground mb-4">
          "{query}"에 대한 검색 결과 {results.length}개
        </p>
        <div className="max-w-md">
          <SearchComponent placeholder="다른 검색어 입력..." />
        </div>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h2>
          <p className="text-muted-foreground mb-6">다른 검색어를 시도해보거나 철자를 확인해주세요.</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>검색 팁:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>더 간단한 키워드를 사용해보세요</li>
              <li>동의어나 관련 용어를 시도해보세요</li>
              <li>영어와 한국어 모두 지원됩니다</li>
            </ul>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">전체 ({results.length})</TabsTrigger>
            <TabsTrigger value="api">API ({filteredResults.api.length})</TabsTrigger>
            <TabsTrigger value="dataset">데이터셋 ({filteredResults.dataset.length})</TabsTrigger>
            <TabsTrigger value="page">페이지 ({filteredResults.page.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">{renderResults(results)}</TabsContent>

          <TabsContent value="api">{renderResults(filteredResults.api)}</TabsContent>

          <TabsContent value="dataset">{renderResults(filteredResults.dataset)}</TabsContent>

          <TabsContent value="page">{renderResults(filteredResults.page)}</TabsContent>
        </Tabs>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  )
}
