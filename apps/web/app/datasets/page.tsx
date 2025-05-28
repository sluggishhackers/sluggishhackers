"use client"
import { Download, FileJson } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SearchComponent from "@/components/search"

export default function DatasetsPage() {
  const categories = [
    {
      id: "executive",
      title: "행정부",
      datasets: [
        {
          id: "budget",
          name: "국가 예산안 및 세출 예산",
          description: "2010년부터 현재까지의 국가 예산안 및 세출 예산 데이터",
          formats: ["CSV", "JSON", "Excel"],
          lastUpdated: "2023-12-31",
          size: "45.2 MB",
        },
        {
          id: "policy",
          name: "정책 입안 및 행정예고 현황",
          description: "2015년부터 현재까지의 정책 입안 및 행정예고 현황 데이터",
          formats: ["CSV", "JSON"],
          lastUpdated: "2024-01-15",
          size: "32.7 MB",
        },
        {
          id: "property",
          name: "공직자 재산 공개",
          description: "2018년부터 현재까지의 공직자 재산 공개 데이터",
          formats: ["CSV", "JSON", "Excel"],
          lastUpdated: "2023-11-20",
          size: "18.5 MB",
        },
        {
          id: "disclosure",
          name: "정보공개청구 처리 통계",
          description: "2016년부터 현재까지의 정보공개청구 처리 통계 데이터",
          formats: ["CSV", "JSON"],
          lastUpdated: "2024-02-10",
          size: "12.3 MB",
        },
        {
          id: "organization",
          name: "정부 조직 및 인력 현황",
          description: "2010년부터 현재까지의 정부 조직 및 인력 현황 데이터",
          formats: ["CSV", "JSON", "Excel"],
          lastUpdated: "2023-10-05",
          size: "28.9 MB",
        },
      ],
    },
    {
      id: "legislative",
      title: "입법부",
      datasets: [
        {
          id: "members",
          name: "국회의원 기본 정보 및 입법 활동 내역",
          description: "19대부터 현재까지의 국회의원 기본 정보 및 입법 활동 내역 데이터",
          formats: ["CSV", "JSON", "Excel"],
          lastUpdated: "2024-01-20",
          size: "36.8 MB",
        },
        {
          id: "minutes",
          name: "회의록 및 발언 기록",
          description: "19대부터 현재까지의 국회 회의록 및 발언 기록 데이터",
          formats: ["CSV", "JSON", "Text"],
          lastUpdated: "2024-02-15",
          size: "125.4 MB",
        },
        {
          id: "budget",
          name: "국회 예산 및 회계 보고서",
          description: "2015년부터 현재까지의 국회 예산 및 회계 보고서 데이터",
          formats: ["CSV", "JSON", "Excel"],
          lastUpdated: "2023-12-10",
          size: "22.1 MB",
        },
        {
          id: "petition",
          name: "국회 청원 및 민원처리 데이터",
          description: "2018년부터 현재까지의 국회 청원 및 민원처리 데이터",
          formats: ["CSV", "JSON"],
          lastUpdated: "2024-01-05",
          size: "15.7 MB",
        },
        {
          id: "party",
          name: "정당별 소속 의원, 교섭단체 현황",
          description: "19대부터 현재까지의 정당별 소속 의원, 교섭단체 현황 데이터",
          formats: ["CSV", "JSON", "Excel"],
          lastUpdated: "2024-02-01",
          size: "8.3 MB",
        },
      ],
    },
    {
      id: "judicial",
      title: "사법부",
      datasets: [
        {
          id: "statistics",
          name: "사법 통계 연보",
          description: "2010년부터 현재까지의 사법 통계 연보 데이터",
          formats: ["CSV", "JSON", "Excel"],
          lastUpdated: "2023-12-20",
          size: "42.6 MB",
        },
        {
          id: "decisions",
          name: "판결문 공개 데이터",
          description: "2015년부터 현재까지의 판결문 공개 데이터",
          formats: ["CSV", "JSON", "Text"],
          lastUpdated: "2024-02-05",
          size: "215.8 MB",
        },
        {
          id: "judges",
          name: "법관 인사 및 배당 정보",
          description: "2018년부터 현재까지의 법관 인사 및 배당 정보 데이터",
          formats: ["CSV", "JSON"],
          lastUpdated: "2023-11-15",
          size: "16.2 MB",
        },
        {
          id: "prosecution",
          name: "검찰 수사 및 기소 통계",
          description: "2015년부터 현재까지의 검찰 수사 및 기소 통계 데이터",
          formats: ["CSV", "JSON", "Excel"],
          lastUpdated: "2024-01-10",
          size: "28.4 MB",
        },
        {
          id: "access",
          name: "법률서비스 접근성 통계",
          description: "2016년부터 현재까지의 법률서비스 접근성 통계 데이터",
          formats: ["CSV", "JSON"],
          lastUpdated: "2023-10-25",
          size: "14.9 MB",
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">데이터셋</h1>
        <p className="text-muted-foreground">
          오픈데이터 카버스에서 제공하는 모든 데이터셋을 다운로드할 수 있습니다. 각 데이터셋은 CSV, JSON, Excel 등
          다양한 형식으로 제공됩니다.
        </p>
      </div>

      <div className="mb-8">
        <SearchComponent placeholder="데이터셋 검색..." />
      </div>

      <Tabs defaultValue="executive">
        <TabsList className="mb-8">
          <TabsTrigger value="executive">행정부</TabsTrigger>
          <TabsTrigger value="legislative">입법부</TabsTrigger>
          <TabsTrigger value="judicial">사법부</TabsTrigger>
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.datasets.map((dataset) => (
                <Card key={dataset.id}>
                  <CardHeader>
                    <CardTitle>{dataset.name}</CardTitle>
                    <CardDescription>{dataset.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">형식</div>
                      <div>{dataset.formats.join(", ")}</div>
                      <div className="text-muted-foreground">마지막 업데이트</div>
                      <div>{dataset.lastUpdated}</div>
                      <div className="text-muted-foreground">크기</div>
                      <div>{dataset.size}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button asChild className="w-full">
                      <a href={`/datasets/${category.id}/${dataset.id}`}>
                        <Download className="mr-2 h-4 w-4" />
                        다운로드
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href={`/api/${category.id}/${dataset.id}`}>
                        <FileJson className="mr-2 h-4 w-4" />
                        API 문서
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
