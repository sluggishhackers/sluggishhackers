import { ArrowLeft, Code, Download, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BudgetApiPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/api">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">뒤로 가기</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">국가 예산안 및 세출 예산 API</h1>
        </div>
        <p className="text-muted-foreground">
          대한민국 정부의 국가 예산안 및 세출 예산 데이터에 접근할 수 있는 API입니다.
        </p>
      </div>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">개요</h2>
          <div className="prose max-w-none dark:prose-invert">
            <p>
              이 API는 대한민국 정부의 국가 예산안 및 세출 예산 데이터를 제공합니다. 연도별, 부처별, 사업별로 예산
              데이터를 조회할 수 있으며, 예산 편성부터 집행까지의 전 과정을 추적할 수 있는 데이터를 제공합니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">기본 정보</h2>
          <div className="grid gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Base URL</h3>
              <div className="bg-muted p-3 rounded-md font-mono text-sm">
                https://api.opendatacarvers.org/v1/executive/budget
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">인증</h3>
              <p className="text-muted-foreground">
                API 키를 통한 인증이 필요합니다. API 키는{" "}
                <Link href="/account" className="underline">
                  계정 페이지
                </Link>
                에서 발급받을 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">요청 헤더</h3>
              <div className="bg-muted p-3 rounded-md font-mono text-sm">Authorization: Bearer YOUR_API_KEY</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">엔드포인트</h2>
          <Tabs defaultValue="yearly">
            <TabsList className="mb-4">
              <TabsTrigger value="yearly">연도별 예산</TabsTrigger>
              <TabsTrigger value="ministry">부처별 예산</TabsTrigger>
              <TabsTrigger value="project">사업별 예산</TabsTrigger>
            </TabsList>
            <TabsContent value="yearly" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">GET /yearly</h3>
                <p className="text-muted-foreground mb-2">연도별 국가 예산 데이터를 조회합니다.</p>
                <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                  GET https://api.opendatacarvers.org/v1/executive/budget/yearly?year=2023
                </div>
                <h4 className="font-semibold mb-2">쿼리 파라미터</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>
                    <span className="font-mono">year</span> (선택): 조회할 연도 (기본값: 현재 연도)
                  </li>
                  <li>
                    <span className="font-mono">from</span> (선택): 시작 연도
                  </li>
                  <li>
                    <span className="font-mono">to</span> (선택): 종료 연도
                  </li>
                </ul>
                <h4 className="font-semibold mb-2">응답 예시</h4>
                <pre className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto">
                  {JSON.stringify(
                    {
                      status: "success",
                      data: {
                        year: 2023,
                        total_budget: 6097000000000,
                        revenue: {
                          tax: 3828000000000,
                          non_tax: 269000000000,
                          fund: 2000000000000,
                        },
                        expenditure: {
                          general_administration: 950000000000,
                          defense: 540000000000,
                          education: 710000000000,
                          social_welfare: 2100000000000,
                          economic_affairs: 1200000000000,
                          others: 597000000000,
                        },
                      },
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="ministry" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">GET /ministry</h3>
                <p className="text-muted-foreground mb-2">부처별 예산 데이터를 조회합니다.</p>
                <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                  GET https://api.opendatacarvers.org/v1/executive/budget/ministry?year=2023&code=1310000
                </div>
                <h4 className="font-semibold mb-2">쿼리 파라미터</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>
                    <span className="font-mono">year</span> (필수): 조회할 연도
                  </li>
                  <li>
                    <span className="font-mono">code</span> (선택): 부처 코드
                  </li>
                  <li>
                    <span className="font-mono">name</span> (선택): 부처 이름
                  </li>
                </ul>
                <h4 className="font-semibold mb-2">응답 예시</h4>
                <pre className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto">
                  {JSON.stringify(
                    {
                      status: "success",
                      data: {
                        year: 2023,
                        ministry: {
                          code: "1310000",
                          name: "과학기술정보통신부",
                          total_budget: 18500000000000,
                          general_account: 12300000000000,
                          special_account: 2200000000000,
                          fund: 4000000000000,
                          programs: [
                            {
                              code: "1311-100",
                              name: "과학기술 연구개발",
                              budget: 9800000000000,
                            },
                            {
                              code: "1311-200",
                              name: "정보통신 인프라",
                              budget: 5700000000000,
                            },
                            {
                              code: "1311-300",
                              name: "디지털 전환 지원",
                              budget: 3000000000000,
                            },
                          ],
                        },
                      },
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="project" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">GET /project</h3>
                <p className="text-muted-foreground mb-2">사업별 예산 데이터를 조회합니다.</p>
                <div className="bg-muted p-3 rounded-md font-mono text-sm mb-4">
                  GET https://api.opendatacarvers.org/v1/executive/budget/project?year=2023&code=1311-100-01
                </div>
                <h4 className="font-semibold mb-2">쿼리 파라미터</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>
                    <span className="font-mono">year</span> (필수): 조회할 연도
                  </li>
                  <li>
                    <span className="font-mono">code</span> (필수): 사업 코드
                  </li>
                </ul>
                <h4 className="font-semibold mb-2">응답 예시</h4>
                <pre className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto">
                  {JSON.stringify(
                    {
                      status: "success",
                      data: {
                        year: 2023,
                        project: {
                          code: "1311-100-01",
                          name: "기초과학 연구지원",
                          ministry: {
                            code: "1310000",
                            name: "과학기술정보통신부",
                          },
                          program: {
                            code: "1311-100",
                            name: "과학기술 연구개발",
                          },
                          budget: 2500000000000,
                          previous_year_budget: 2300000000000,
                          change_rate: 8.7,
                          execution_rate: 95.2,
                          details: [
                            {
                              item: "인건비",
                              amount: 150000000000,
                            },
                            {
                              item: "연구장비 구축",
                              amount: 850000000000,
                            },
                            {
                              item: "연구과제 지원",
                              amount: 1500000000000,
                            },
                          ],
                        },
                      },
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">코드 예제</h2>
          <Tabs defaultValue="javascript">
            <TabsList className="mb-4">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
            </TabsList>
            <TabsContent value="javascript" className="space-y-4">
              <pre className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto">
                {`// 연도별 예산 데이터 조회하기
async function fetchYearlyBudget(year = 2023) {
  const response = await fetch(
    \`https://api.opendatacarvers.org/v1/executive/budget/yearly?year=\${year}\`,
    {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('API 요청 실패: ' + response.status);
  }
  
  return await response.json();
}

// 사용 예시
fetchYearlyBudget(2023)
  .then(data => console.log(data))
  .catch(error => console.error(error));`}
              </pre>
            </TabsContent>
            <TabsContent value="python" className="space-y-4">
              <pre className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto">
                {`import requests

def fetch_yearly_budget(year=2023, api_key='YOUR_API_KEY'):
    url = f'https://api.opendatacarvers.org/v1/executive/budget/yearly?year={year}'
    headers = {
        'Authorization': f'Bearer {api_key}'
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # 오류 발생 시 예외 발생
    
    return response.json()

# 사용 예시
try:
    data = fetch_yearly_budget(2023)
    print(data)
except requests.exceptions.RequestException as e:
    print(f'API 요청 실패: {e}')`}
              </pre>
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">관련 자료</h2>
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  예산 데이터셋 다운로드
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Code className="mr-2 h-4 w-4" />
                  GitHub 샘플 코드
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <a href="https://www.openfiscaldata.go.kr/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  열린재정데이터 포털
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
