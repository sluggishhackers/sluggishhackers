import Link from "next/link"
import { ChevronRight, FileJson } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ApiPage() {
  const categories = [
    {
      id: "executive",
      title: "행정부",
      description: "정부 부처 및 산하기관 중심",
      apis: [
        { name: "국가 예산안 및 세출 예산 API", endpoint: "/api/executive/budget" },
        { name: "정책 입안 및 행정예고 현황 API", endpoint: "/api/executive/policy" },
        { name: "공직자 재산 공개 API", endpoint: "/api/executive/property" },
        { name: "정보공개청구 처리 통계 API", endpoint: "/api/executive/disclosure" },
        { name: "정부 조직 및 인력 현황 API", endpoint: "/api/executive/organization" },
      ],
    },
    {
      id: "legislative",
      title: "입법부",
      description: "국회 및 정당 관련 데이터",
      apis: [
        { name: "국회의원 기본 정보 및 입법 활동 내역 API", endpoint: "/api/legislative/members" },
        { name: "회의록 및 발언 기록 API", endpoint: "/api/legislative/minutes" },
        { name: "국회 예산 및 회계 보고서 API", endpoint: "/api/legislative/budget" },
        { name: "국회 청원 및 민원처리 데이터 API", endpoint: "/api/legislative/petition" },
        { name: "정당별 소속 의원, 교섭단체 현황 API", endpoint: "/api/legislative/party" },
      ],
    },
    {
      id: "judicial",
      title: "사법부",
      description: "법원 및 검찰 관련 데이터",
      apis: [
        { name: "사법 통계 연보 API", endpoint: "/api/judicial/statistics" },
        { name: "판결문 공개 데이터 API", endpoint: "/api/judicial/decisions" },
        { name: "법관 인사 및 배당 정보 API", endpoint: "/api/judicial/judges" },
        { name: "검찰 수사 및 기소 통계 API", endpoint: "/api/judicial/prosecution" },
        { name: "법률서비스 접근성 통계 API", endpoint: "/api/judicial/access" },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">API 문서</h1>
        <p className="text-muted-foreground">
          오픈데이터 카버스에서 제공하는 모든 API에 대한 문서입니다. 각 API는 RESTful 방식으로 제공되며, JSON 형식으로
          응답합니다.
        </p>
      </div>

      <div className="grid gap-8">
        {categories.map((category) => (
          <section key={category.id}>
            <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
            <p className="text-muted-foreground mb-4">{category.description}</p>

            <div className="grid gap-4">
              {category.apis.map((api) => (
                <Card key={api.endpoint}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{api.name}</CardTitle>
                    <CardDescription>{api.endpoint}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" size="sm">
                      <Link href={api.endpoint}>
                        <FileJson className="mr-2 h-4 w-4" />
                        API 문서 보기
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
