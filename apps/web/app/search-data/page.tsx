"use client"

import Link from "next/link"
import { Scale, Building2, Users, FileText, ArrowRight, Lock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import AuthModal from "@/components/auth/auth-modal"

export default function SearchDataPage() {
  const { user, isConfigured } = useAuth()

  const dataServices = [
    {
      id: "judgments",
      title: "판결문 검색",
      description: "대한민국 법원의 판결문을 검색하고 상세 내용을 확인할 수 있습니다.",
      icon: Scale,
      category: "사법부",
      dataCount: "1,250,000+",
      features: ["키워드 검색", "날짜 필터", "법원별 필터", "사건종류별 분류"],
      href: "/search-data/judgments",
      available: true,
    },
    {
      id: "budget",
      title: "예산 데이터 검색",
      description: "정부 부처별, 사업별 예산 데이터를 상세하게 검색할 수 있습니다.",
      icon: Building2,
      category: "행정부",
      dataCount: "500,000+",
      features: ["부처별 검색", "사업별 검색", "연도별 필터", "예산액 정렬"],
      href: "/search-data/budget",
      available: true,
    },
    {
      id: "members",
      title: "국회의원 활동 검색",
      description: "국회의원의 입법 활동, 발언 기록, 위원회 활동을 검색할 수 있습니다.",
      icon: Users,
      category: "입법부",
      dataCount: "300,000+",
      features: ["의원별 검색", "발언 검색", "법안 검색", "위원회별 필터"],
      href: "/search-data/members",
      available: true,
    },
    {
      id: "policies",
      title: "정책 문서 검색",
      description: "정부 정책 문서와 행정예고를 검색하고 분석할 수 있습니다.",
      icon: FileText,
      category: "행정부",
      dataCount: "150,000+",
      features: ["정책명 검색", "부처별 필터", "시행일 정렬", "영향도 분석"],
      href: "/search-data/policies",
      available: false, // 준비 중
    },
  ]

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        {!isConfigured && (
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              현재 데모 모드입니다. 실제 데이터베이스 연동을 위해서는 Supabase 설정이 필요합니다.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-center py-12">
          <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">데이터 검색 서비스</h1>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            오픈데이터 카버스의 고급 데이터 검색 서비스를 이용하려면 로그인이 필요합니다.
            {isConfigured
              ? "회원가입은 무료이며, 모든 데이터에 자유롭게 접근할 수 있습니다."
              : "현재 데모 모드에서는 샘플 데이터로 기능을 체험할 수 있습니다."}
          </p>
          <AuthModal>
            <Button size="lg">
              {isConfigured ? "로그인 / 회원가입" : "데모 로그인"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </AuthModal>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">제공되는 데이터 서비스</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {dataServices.map((service) => (
              <Card key={service.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <service.icon className="h-6 w-6 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{service.category}</Badge>
                          <span className="text-sm text-muted-foreground">{service.dataCount} 건</span>
                        </div>
                      </div>
                    </div>
                    {!service.available && <Badge variant="outline">준비중</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{service.description}</CardDescription>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">주요 기능:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <div className="absolute inset-0 bg-muted/10 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">로그인이 필요합니다</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {!isConfigured && (
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            현재 데모 모드입니다. 표시되는 데이터는 샘플 데이터이며, 실제 데이터베이스 연동을 위해서는 Supabase 설정이
            필요합니다.
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">데이터 검색 서비스</h1>
        <p className="text-muted-foreground">
          안녕하세요, {user.email}님! 다양한 공공데이터를 직접 검색하고 분석해보세요.
          {!isConfigured && " (현재 데모 모드)"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {dataServices.map((service) => (
          <Card
            key={service.id}
            className={`transition-all duration-200 ${service.available ? "hover:shadow-lg cursor-pointer" : "opacity-60"}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <service.icon className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{service.category}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {service.dataCount} 건 {!isConfigured && "(샘플)"}
                      </span>
                    </div>
                  </div>
                </div>
                {!service.available && <Badge variant="outline">준비중</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{service.description}</CardDescription>
              <div className="space-y-2 mb-4">
                <h4 className="font-medium text-sm">주요 기능:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="w-full" disabled={!service.available}>
                <Link href={service.available ? service.href : "#"}>
                  {service.available ? "검색 시작" : "준비 중"}
                  {service.available && <ArrowRight className="ml-2 h-4 w-4" />}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
