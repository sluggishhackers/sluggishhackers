import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dataCategories, getAllDatasets } from "@/lib/data-structure"
import DatasetCard from "@/components/dataset-card"

export default function DataListPage() {
  const allDatasets = getAllDatasets()
  const searchableDatasets = allDatasets.filter((dataset) => dataset.hasSearch)
  const downloadOnlyDatasets = allDatasets.filter((dataset) => !dataset.hasSearch)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">전체 데이터 목록</h1>
        <p className="text-muted-foreground">
          오픈데이터 카버스에서 제공하는 모든 공공데이터를 한눈에 확인하고 접근할 수 있습니다.
        </p>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="데이터셋 이름, 설명, 태그로 검색..." className="pl-8" />
          </div>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 카테고리</SelectItem>
            {dataCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="유형 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 유형</SelectItem>
            <SelectItem value="searchable">검색 가능</SelectItem>
            <SelectItem value="download">다운로드만</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 카테고리별 탭 */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">전체 ({allDatasets.length})</TabsTrigger>
          <TabsTrigger value="searchable">검색 가능 ({searchableDatasets.length})</TabsTrigger>
          <TabsTrigger value="download">다운로드만 ({downloadOnlyDatasets.length})</TabsTrigger>
          {dataCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name} ({category.datasets.length})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allDatasets.map((dataset) => {
              const category = dataCategories.find((cat) => cat.id === dataset.category)
              return (
                <DatasetCard
                  key={`${dataset.category}-${dataset.id}`}
                  dataset={dataset}
                  categoryName={category?.name || ""}
                />
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="searchable">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {searchableDatasets.map((dataset) => {
              const category = dataCategories.find((cat) => cat.id === dataset.category)
              return (
                <DatasetCard
                  key={`${dataset.category}-${dataset.id}`}
                  dataset={dataset}
                  categoryName={category?.name || ""}
                />
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="download">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {downloadOnlyDatasets.map((dataset) => {
              const category = dataCategories.find((cat) => cat.id === dataset.category)
              return (
                <DatasetCard
                  key={`${dataset.category}-${dataset.id}`}
                  dataset={dataset}
                  categoryName={category?.name || ""}
                />
              )
            })}
          </div>
        </TabsContent>

        {dataCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.datasets.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} categoryName={category.name} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
