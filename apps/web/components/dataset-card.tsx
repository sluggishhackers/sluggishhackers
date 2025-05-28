import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import DatasetUpdateBadge from "@/components/dataset-update-badge"
import type { Dataset } from "@/lib/data-structure"

interface DatasetCardProps {
  dataset: Dataset
  categoryName: string
}

export default function DatasetCard({ dataset, categoryName }: DatasetCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{dataset.name}</CardTitle>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline">{categoryName}</Badge>
              {dataset.hasSearch && <Badge variant="secondary">검색 가능</Badge>}
              {dataset.featured && <Badge variant="default">주요</Badge>}
              <DatasetUpdateBadge categoryId={dataset.category} datasetId={dataset.id} />
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
            <Link href={`/data/${dataset.category}/${dataset.id}`}>
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
  )
}
