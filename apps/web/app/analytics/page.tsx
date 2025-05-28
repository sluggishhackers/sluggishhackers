"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Search, Download, Users, AlertCircle, RefreshCw, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import type { DashboardStats } from "@/lib/analytics"

export default function AnalyticsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/analytics/stats")
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Failed to fetch stats:", error)
      toast({
        title: "통계 로딩 실패",
        description: "통계 데이터를 불러오는 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchStats()
    setRefreshing(false)
    toast({
      title: "통계 새로고침",
      description: "최신 통계 데이터를 불러왔습니다.",
    })
  }

  const handleAdminAction = async (action: string) => {
    try {
      const response = await fetch("/api/analytics/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "작업 완료",
          description: result.message,
        })
        await fetchStats()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "작업 실패",
        description: "관리 작업 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">통계 로딩 중...</span>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">통계를 불러올 수 없습니다.</p>
          <Button onClick={fetchStats} className="mt-4">
            다시 시도
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">사이트 통계</h1>
          <p className="text-muted-foreground">오픈데이터 카버스의 사용 현황과 인기 데이터를 확인할 수 있습니다.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} variant="outline" disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            새로고침
          </Button>
          {stats.isDemo && (
            <Button onClick={() => handleAdminAction("generate")} variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              샘플 데이터 생성
            </Button>
          )}
        </div>
      </div>

      {stats.isDemo && (
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            현재 데모 모드입니다. 실제 통계 데이터를 보려면 Redis 설정이 필요합니다. 표시되는 데이터는 샘플
            데이터입니다.
          </AlertDescription>
        </Alert>
      )}

      {/* 주요 지표 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">오늘 검색 수</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.searchStats.totalSearches.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">고유 검색어: {stats.searchStats.uniqueQueries}개</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">오늘 다운로드 수</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.downloadStats.totalDownloads.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              인기 데이터셋: {stats.downloadStats.popularDatasets.length}개
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 사용자 활동</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(stats.searchStats.totalSearches + stats.downloadStats.totalDownloads).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">검색 + 다운로드 합계</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활동 지수</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((stats.searchStats.totalSearches + stats.downloadStats.totalDownloads) / 10)}
            </div>
            <p className="text-xs text-muted-foreground">일일 활동 점수</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="search" className="space-y-6">
        <TabsList>
          <TabsTrigger value="search">검색 통계</TabsTrigger>
          <TabsTrigger value="download">다운로드 통계</TabsTrigger>
          <TabsTrigger value="category">카테고리별</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>인기 검색어</CardTitle>
                <CardDescription>오늘 가장 많이 검색된 키워드입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.searchStats.popularQueries.length > 0 ? (
                    stats.searchStats.popularQueries.map((item, index) => (
                      <div key={item.query} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{index + 1}</Badge>
                          <span className="font-medium">{item.query}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{item.count}회</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">아직 검색 데이터가 없습니다.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>검색 활동 분석</CardTitle>
                <CardDescription>검색 패턴과 사용자 관심사를 분석합니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>검색 활성도</span>
                      <span>{Math.round((stats.searchStats.totalSearches / 2000) * 100)}%</span>
                    </div>
                    <Progress value={Math.min((stats.searchStats.totalSearches / 2000) * 100, 100)} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>검색어 다양성</span>
                      <span>{Math.round((stats.searchStats.uniqueQueries / 100) * 100)}%</span>
                    </div>
                    <Progress value={Math.min((stats.searchStats.uniqueQueries / 100) * 100, 100)} />
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      평균 검색어당{" "}
                      {Math.round(stats.searchStats.totalSearches / Math.max(stats.searchStats.uniqueQueries, 1))}회
                      검색
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="download" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>인기 데이터셋</CardTitle>
                <CardDescription>오늘 가장 많이 다운로드된 데이터셋입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.downloadStats.popularDatasets.length > 0 ? (
                    stats.downloadStats.popularDatasets.map((item, index) => (
                      <div key={item.dataset} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{index + 1}</Badge>
                          <span className="font-medium">{item.dataset}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{item.count}회</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">아직 다운로드 데이터가 없습니다.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>다운로드 활동 분석</CardTitle>
                <CardDescription>데이터 활용 패턴을 분석합니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>다운로드 활성도</span>
                      <span>{Math.round((stats.downloadStats.totalDownloads / 1000) * 100)}%</span>
                    </div>
                    <Progress value={Math.min((stats.downloadStats.totalDownloads / 1000) * 100, 100)} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>데이터셋 다양성</span>
                      <span>{Math.round((stats.downloadStats.popularDatasets.length / 10) * 100)}%</span>
                    </div>
                    <Progress value={Math.min((stats.downloadStats.popularDatasets.length / 10) * 100, 100)} />
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      평균 데이터셋당{" "}
                      {Math.round(
                        stats.downloadStats.totalDownloads / Math.max(stats.downloadStats.popularDatasets.length, 1),
                      )}
                      회 다운로드
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="category" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>카테고리별 다운로드 현황</CardTitle>
              <CardDescription>각 데이터 카테고리별 인기도를 확인할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(stats.downloadStats.categoryStats).map(([category, count]) => {
                  const categoryNames: Record<string, string> = {
                    executive: "행정부",
                    legislative: "입법부",
                    judicial: "사법부",
                  }
                  const maxCount = Math.max(...Object.values(stats.downloadStats.categoryStats))
                  const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0

                  return (
                    <div key={category}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">{categoryNames[category] || category}</span>
                        <span>{count}회</span>
                      </div>
                      <Progress value={percentage} />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
