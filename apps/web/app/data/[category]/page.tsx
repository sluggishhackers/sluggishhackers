import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Search, Download, FileJson, Building2, Users, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { dataCategories } from "@/lib/data-structure"

const iconMap = {
  Building2,
  Users,
  Scale,
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = dataCategories.find((cat) => cat.id === params.category)

  if (!category) {
    notFound()
  }

  const IconComponent = iconMap[category.icon as keyof typeof iconMap]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
        <Link href="/data" className="hover:text-foreground">
          데이터 목록
        </Link>
        <span>/</span>
        <span className="text-foreground">{category.name}</span>
      </div>

      {/* 카테고리 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button asChild variant="outline" size="icon">
            <Link href="/data">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className={`p-3 rounded-lg ${category.color} text-white`}>
            <IconComponent className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary">{category.datasetCount}개 데이터셋</Badge>
          <Badge variant="outline">{category.datasets.filter((d) => d.hasSearch).length}개 검색 가능</Badge>
        </div>
      </div>

      {/* 데이터셋 목록 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {category.datasets.map((dataset) => (
          <Card key={dataset.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{dataset.name}</CardTitle>
                  <div className="flex gap-2 mb-2">
                    {dataset.hasSearch && <Badge variant="secondary">검색 가능</Badge>}
                    {dataset.featured && <Badge variant="default">주요</Badge>}
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
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href={`/data/${category.id}/${dataset.id}`}>
                    상세 보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                {dataset.hasSearch && (
                  <Button asChild variant="outline" size="icon">
                    <Link href={dataset.searchUrl!}>
                      <Search className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 관련 링크 */}
      <div className="mt-12 p-6 bg-muted/30 rounded-lg">
        <h2 className="text-xl font-bold mb-4">관련 서비스</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Button asChild variant="outline" className="justify-start">
            <Link href={`/api?category=${category.id}`}>
              <FileJson className="mr-2 h-4 w-4" />
              {category.name} API 문서
            </Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link href={`/datasets?category=${category.id}`}>
              <Download className="mr-2 h-4 w-4" />
              {category.name} 데이터셋
            </Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link href="/search-data">
              <Search className="mr-2 h-4 w-4" />
              데이터 검색 서비스
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return dataCategories.map((category) => ({
    category: category.id,
  }))
}
