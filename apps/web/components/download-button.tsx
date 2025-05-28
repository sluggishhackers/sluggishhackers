"use client"

import type React from "react"

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface DownloadButtonProps {
  datasetId: string
  category: string
  format: string
  downloadUrl: string
  children?: React.ReactNode
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function DownloadButton({
  datasetId,
  category,
  format,
  downloadUrl,
  children,
  variant = "default",
  size = "default",
  className,
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const { toast } = useToast()

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      // 다운로드 통계 추적
      await fetch("/api/analytics/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          datasetId,
          category,
          format,
        }),
      })

      // 실제 다운로드 시뮬레이션 (실제로는 downloadUrl로 리다이렉트)
      window.open(downloadUrl, "_blank")

      toast({
        title: "다운로드 시작",
        description: `${format} 형식으로 데이터셋 다운로드를 시작합니다.`,
      })
    } catch (error) {
      console.error("Download tracking failed:", error)
      // 추적 실패해도 다운로드는 진행
      window.open(downloadUrl, "_blank")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleDownload} disabled={isDownloading}>
      {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
      {children || "다운로드"}
    </Button>
  )
}
