"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, FileJson, Database, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { searchItems, type SearchItem, getCategoryLabel } from "@/lib/search-data"
import { cn } from "@/lib/utils"

interface SearchProps {
  className?: string
  placeholder?: string
}

export default function SearchComponent({ className, placeholder = "검색..." }: SearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchItems(query).slice(0, 8) // 최대 8개 결과만 표시
      setResults(searchResults)
      setIsOpen(true)
      setSelectedIndex(-1)
    } else {
      setResults([])
      setIsOpen(false)
      setSelectedIndex(-1)
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // 검색 통계 추적 함수
  const trackSearchAnalytics = async (searchQuery: string, category?: string) => {
    try {
      await fetch("/api/analytics/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
          category: category,
        }),
      })
    } catch (error) {
      console.error("Failed to track search:", error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleSelectResult(results[selectedIndex])
        } else if (query.trim()) {
          handleSearch()
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleSelectResult = (result: SearchItem) => {
    // 검색 통계 추적
    trackSearchAnalytics(query, result.category)

    router.push(result.url)
    setIsOpen(false)
    setQuery("")
    inputRef.current?.blur()
  }

  const handleSearch = () => {
    if (query.trim()) {
      // 검색 통계 추적
      trackSearchAnalytics(query)

      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  const getCategoryIcon = (category: SearchItem["category"]) => {
    switch (category) {
      case "api":
        return <FileJson className="h-4 w-4" />
      case "dataset":
        return <Database className="h-4 w-4" />
      case "page":
        return <FileText className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          className="pl-8 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-6 w-6 p-0"
            onClick={() => {
              setQuery("")
              setIsOpen(false)
              inputRef.current?.focus()
            }}
          >
            ×
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg max-h-96 overflow-auto">
          {results.map((result, index) => (
            <button
              key={result.id}
              className={cn(
                "w-full text-left px-3 py-2 hover:bg-muted transition-colors border-b last:border-b-0",
                selectedIndex === index && "bg-muted",
              )}
              onClick={() => handleSelectResult(result)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-muted-foreground">{getCategoryIcon(result.category)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm truncate">{result.title}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {getCategoryLabel(result.category)}
                    </span>
                    {result.subcategory && <span className="text-xs text-muted-foreground">{result.subcategory}</span>}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{result.description}</p>
                </div>
              </div>
            </button>
          ))}
          {query.trim() && (
            <button
              className="w-full text-left px-3 py-2 hover:bg-muted transition-colors border-t text-sm text-muted-foreground"
              onClick={handleSearch}
            >
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />"{query}" 전체 검색 결과 보기
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
