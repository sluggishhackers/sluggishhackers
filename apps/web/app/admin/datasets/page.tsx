"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { dataCategories } from "@/lib/data-structure"
import { Calendar, Loader2 } from "lucide-react"

export default function AdminDatasetsPage() {
  const { toast } = useToast()
  const [categoryId, setCategoryId] = useState("")
  const [datasetId, setDatasetId] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)

  const handleCategoryChange = (value: string) => {
    setCategoryId(value)
    setDatasetId("")
    setSelectedCategory(dataCategories.find((cat) => cat.id === value) || null)
  }

  const handleUpdateDataset = async () => {
    if (!categoryId || !datasetId) {
      toast({
        title: "입력 오류",
        description: "카테고리와 데이터셋을 모두 선택해주세요.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/datasets/admin/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId,
          datasetId,
          date: new Date().toISOString(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "업데이트 성공",
          description: `${categoryId}:${datasetId} 데이터셋의 업데이트 일자가 설정되었습니다.`,
        })
      } else {
        throw new Error(data.error || "알 수 없는 오류가 발생했습니다.")
      }
    } catch (error) {
      toast({
        title: "업데이트 실패",
        description: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">데이터셋 관리</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>데이터셋 업데이트 일자 설정</CardTitle>
          <CardDescription>
            데이터셋의 최신 업데이트 일자를 수동으로 설정합니다. 이 기능은 크롤링 작업이 완료된 후 자동으로 호출될 수
            있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">카테고리</Label>
                <Select value={categoryId} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataset">데이터셋</Label>
                <Select value={datasetId} onValueChange={setDatasetId} disabled={!selectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="데이터셋 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory?.datasets.map((dataset: any) => (
                      <SelectItem key={dataset.id} value={dataset.id}>
                        {dataset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={handleUpdateDataset} disabled={loading || !categoryId || !datasetId}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    처리 중...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    현재 시간으로 업데이트 일자 설정
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
