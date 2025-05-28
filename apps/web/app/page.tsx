import Link from "next/link"
import { ArrowRight, Building2, Users, Scale, TrendingUp, Database, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { dataCategories, getFeaturedDatasets } from "@/lib/data-structure"

const iconMap = {
  Building2,
  Users,
  Scale,
}

export default function Home() {
  const featuredDatasets = getFeaturedDatasets()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">오픈데이터 카버스</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          대한민국의 공공데이터를 누구나 쉽게 접근할 수 있도록 전자화하는 개발자들의 비영리 커뮤니티입니다. 마치 장인이
          방망이를 깎듯, 흩어지고 닫혀 있던 정부 데이터를 하나하나 다듬어 오픈 API와 활용 가능한 데이터셋으로
          바꿔냅니다.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button asChild size="lg">
            <Link href="/data">
              <Database className="mr-2 h-5 w-5" />
              모든 데이터 보기
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/search-data">
              <Search className="mr-2 h-5 w-5" />
              데이터 검색
            </Link>
          </Button>
        </div>
      </section>

      {/* 주요 카테고리 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-2">데이터 카테고리</h2>
        <p className="text-muted-foreground text-center mb-8">
          정치투명성 관련 오픈데이터를 3개 주요 카테고리로 분류하여 제공합니다
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dataCategories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap]
            return (
              <Card key={category.id} className="relative overflow-hidden group hover:shadow-lg transition-all">
                <div className={`absolute top-0 left-0 right-0 h-1 ${category.color}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${category.color} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <Badge variant="secondary">{category.datasetCount}개 데이터셋</Badge>
                    </div>
                  </div>
                  <CardDescription className="text-sm">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">주요 데이터셋:</h4>
                    <ul className="space-y-2">
                      {category.datasets.slice(0, 3).map((dataset) => (
                        <li key={dataset.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          <span className="truncate">{dataset.name}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-4" variant="outline">
                      <Link href={`/data/${category.id}`}>
                        {category.name} 데이터 보기
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* 주요 데이터셋 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-2">주요 데이터셋</h2>
        <p className="text-muted-foreground text-center mb-8">가장 인기 있고 활용도가 높은 데이터셋들입니다</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDatasets.map((dataset) => (
            <Card key={dataset.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{dataset.name}</CardTitle>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="outline">{dataCategories.find((cat) => cat.id === dataset.category)?.name}</Badge>
                      {dataset.hasSearch && <Badge variant="secondary">검색 가능</Badge>}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 line-clamp-3">{dataset.description}</CardDescription>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                  <div>레코드: {dataset.recordCount}</div>
                  <div>크기: {dataset.size}</div>
                  <div>업데이트: {dataset.updateFrequency}</div>
                  <div>형식: {dataset.formats.join(", ")}</div>
                </div>
                <Button asChild className="w-full">
                  <Link href={`/data/${dataset.category}/${dataset.id}`}>
                    상세 보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="bg-muted/30 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">플랫폼 현황</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {dataCategories.reduce((sum, cat) => sum + cat.datasetCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">총 데이터셋</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2M+</div>
            <div className="text-sm text-muted-foreground">총 레코드 수</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {dataCategories.filter((cat) => cat.datasets.some((d) => d.hasSearch)).length}
            </div>
            <div className="text-sm text-muted-foreground">검색 가능 카테고리</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">API 서비스</div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">지금 시작해보세요</h2>
        <p className="text-muted-foreground mb-6">투명하고 개방된 디지털 공공 자산을 만들어가는 여정에 함께하세요</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button asChild size="lg">
            <Link href="/data">
              <TrendingUp className="mr-2 h-5 w-5" />
              데이터 탐색하기
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="https://github.com/opendatacarvers" target="_blank" rel="noopener noreferrer">
              GitHub에서 기여하기
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
