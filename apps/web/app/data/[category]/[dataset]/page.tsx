import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Search, Download, FileJson, Calendar, Database, RefreshCw, Tag, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { dataCategories, getDatasetById } from "@/lib/data-structure"
import DownloadButton from "@/components/download-button"
import DatasetUpdateBadge from "@/components/dataset-update-badge"

interface DatasetPageProps {
  params: {
    category: string
    dataset: string
  }
}

export default function DatasetPage({ params }: DatasetPageProps) {
  const dataset = getDatasetById(params.category, params.dataset)
  const category = dataCategories.find((cat) => cat.id === params.category)

  if (!dataset || !category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
        <Link href="/data" className="hover:text-foreground">
          데이터 목록
        </Link>
        <span>/</span>
        <Link href={`/data/${category.id}`} className="hover:text-foreground">
          {category.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{dataset.name}</span>
      </div>

      {/* 헤더 */}
      <div className="flex items-start gap-4 mb-8">
        <Button asChild variant="outline" size="icon">
          <Link href={`/data/${category.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{dataset.name}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">{category.name}</Badge>
            {dataset.hasSearch && <Badge variant="secondary">검색 가능</Badge>}
            {dataset.featured && <Badge variant="default">주요 데이터셋</Badge>}
            <DatasetUpdateBadge categoryId={category.id} datasetId={dataset.id} />
          </div>
          <p className="text-muted-foreground text-lg">{dataset.description}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* 메인 콘텐츠 */}
        <div className="lg:col-span-2 space-y-8">
          {/* 데이터 접근 방법 */}
          <Card>
            <CardHeader>
              <CardTitle>데이터 접근 방법</CardTitle>
              <CardDescription>이 데이터셋에 접근할 수 있는 다양한 방법을 제공합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dataset.hasSearch && (
                <div className="p-4 border rounded-lg bg-primary/5">
                  <div className="flex items-center gap-3 mb-2">
                    <Search className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">사이트 내 검색</h3>
                    <Badge variant="secondary">추천</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    웹 브라우저에서 직접 데이터를 검색하고 필터링할 수 있습니다. 로그인이 필요합니다.
                  </p>
                  <Button asChild>
                    <Link href={dataset.searchUrl!}>
                      <Search className="mr-2 h-4 w-4" />
                      데이터 검색하기
                    </Link>
                  </Button>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <FileJson className="h-5 w-5" />
                    <h3 className="font-semibold">API 접근</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    RESTful API를 통해 프로그래밍 방식으로 데이터에 접근할 수 있습니다.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={dataset.apiUrl}>
                      <FileJson className="mr-2 h-4 w-4" />
                      API 문서 보기
                    </Link>
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Download className="h-5 w-5" />
                    <h3 className="font-semibold">데이터셋 다운로드</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    전체 데이터를 {dataset.formats.join(", ")} 형식으로 다운로드할 수 있습니다.
                  </p>
                  <DownloadButton
                    datasetId={dataset.id}
                    category={category.id}
                    format={dataset.formats[0]}
                    downloadUrl={dataset.downloadUrl}
                    variant="outline"
                    className="w-full"
                  >
                    다운로드하기
                  </DownloadButton>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 데이터 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>데이터 정보</CardTitle>
              <CardDescription>이 데이터셋의 상세 정보와 수집 방법을 확인할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  데이터 출처
                </h3>
                <p className="text-muted-foreground">{dataset.source}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  수집 방법
                </h3>
                <p className="text-muted-foreground">{dataset.collectionMethod}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  태그
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {dataset.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 사용 예시 */}
          <Card>
            <CardHeader>
              <CardTitle>활용 예시</CardTitle>
              <CardDescription>이 데이터셋을 활용할 수 있는 다양한 방법들입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataset.id === "budget" && (
                  <>
                    <div className="p-3 bg-muted/50 rounded">
                      <h4 className="font-medium mb-1">정부 지출 분석</h4>
                      <p className="text-sm text-muted-foreground">
                        부처별, 연도별 예산 변화를 분석하여 정부 정책 우선순위 파악
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <h4 className="font-medium mb-1">예산 투명성 모니터링</h4>
                      <p className="text-sm text-muted-foreground">
                        예산 편성과 집행 현황을 비교하여 재정 운용의 투명성 검증
                      </p>
                    </div>
                  </>
                )}
                {dataset.id === "judgments" && (
                  <>
                    <div className="p-3 bg-muted/50 rounded">
                      <h4 className="font-medium mb-1">판례 연구</h4>
                      <p className="text-sm text-muted-foreground">
                        유사 사건의 판결 경향을 분석하여 법적 판단 기준 연구
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <h4 className="font-medium mb-1">사법 통계 분석</h4>
                      <p className="text-sm text-muted-foreground">
                        사건 유형별, 법원별 판결 통계를 통한 사법부 현황 파악
                      </p>
                    </div>
                  </>
                )}
                {dataset.id === "members" && (
                  <>
                    <div className="p-3 bg-muted/50 rounded">
                      <h4 className="font-medium mb-1">의정활동 평가</h4>
                      <p className="text-sm text-muted-foreground">
                        국회의원별 입법 활동과 출석률을 통한 의정활동 성과 분석
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <h4 className="font-medium mb-1">정치 동향 분석</h4>
                      <p className="text-sm text-muted-foreground">
                        정당별, 지역별 의원 활동 패턴을 통한 정치 동향 파악
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          {/* 데이터 통계 */}
          <Card>
            <CardHeader>
              <CardTitle>데이터 통계</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">총 레코드 수</span>
                <span className="font-semibold">{dataset.recordCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">파일 크기</span>
                <span className="font-semibold">{dataset.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">지원 형식</span>
                <span className="font-semibold">{dataset.formats.join(", ")}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <RefreshCw className="h-3 w-3" />
                  업데이트 주기
                </span>
                <span className="font-semibold">{dataset.updateFrequency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  최근 업데이트
                </span>
                <span className="font-semibold">{dataset.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>

          {/* 관련 데이터셋 */}
          <Card>
            <CardHeader>
              <CardTitle>관련 데이터셋</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.datasets
                  .filter((d) => d.id !== dataset.id)
                  .slice(0, 3)
                  .map((relatedDataset) => (
                    <Link
                      key={relatedDataset.id}
                      href={`/data/${category.id}/${relatedDataset.id}`}
                      className="block p-3 border rounded hover:bg-muted/50 transition-colors"
                    >
                      <h4 className="font-medium text-sm mb-1">{relatedDataset.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{relatedDataset.description}</p>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* 도움말 */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              데이터 사용 중 문제가 있거나 개선 사항이 있다면{" "}
              <Link href="https://github.com/opendatacarvers" className="underline">
                GitHub
              </Link>
              에서 이슈를 등록해주세요.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  const params: { category: string; dataset: string }[] = []

  dataCategories.forEach((category) => {
    category.datasets.forEach((dataset) => {
      params.push({
        category: category.id,
        dataset: dataset.id,
      })
    })
  })

  return params
}
