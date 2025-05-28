"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, Loader2 } from "lucide-react"

interface DatasetUpdateBadgeProps {
  categoryId: string
  datasetId: string
  className?: string
}

export default function DatasetUpdateBadge({ categoryId, datasetId, className }: DatasetUpdateBadgeProps) {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchLastUpdated = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/datasets/last-updated?category=${categoryId}&dataset=${datasetId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch last updated date")
        }

        const data = await response.json()

        if (data.success && data.data.lastUpdated) {
          setLastUpdated(new Date(data.data.lastUpdated))
        }
      } catch (err) {
        console.error("Error fetching dataset last updated date:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchLastUpdated()
  }, [categoryId, datasetId])

  // 상대적 시간 표시 (예: "3일 전", "1주일 전")
  const getRelativeTimeString = (date: Date): string => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "오늘"
    } else if (diffDays === 1) {
      return "어제"
    } else if (diffDays < 7) {
      return `${diffDays}일 전`
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return `${weeks}주 전`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `${months}개월 전`
    } else {
      const years = Math.floor(diffDays / 365)
      return `${years}년 전`
    }
  }

  // 전체 날짜 포맷 (툴팁에 표시)
  const getFullDateString = (date: Date): string => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <Badge variant="outline" className={className}>
        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
        업데이트 확인 중...
      </Badge>
    )
  }

  if (error || !lastUpdated) {
    return null
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={className}>
            <Calendar className="h-3 w-3 mr-1" />
            {getRelativeTimeString(lastUpdated)} 업데이트
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>마지막 업데이트: {getFullDateString(lastUpdated)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
