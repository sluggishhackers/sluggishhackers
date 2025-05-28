"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Database, FileJson, Home, Menu, Moon, Sun, Search, Download, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import SearchComponent from "@/components/search"
import { useAuth } from "@/contexts/auth-context"
import AuthModal from "@/components/auth/auth-modal"
import UserMenu from "@/components/auth/user-menu"

export default function Header() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const { user, loading: authLoading } = useAuth()

  const routes = [
    {
      href: "/",
      label: "홈",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/data",
      label: "데이터",
      icon: Database,
      active: pathname.startsWith("/data"),
    },
    {
      href: "/api",
      label: "API 문서",
      icon: FileJson,
      active: pathname.startsWith("/api"),
    },
    {
      href: "/datasets",
      label: "다운로드",
      icon: Download,
      active: pathname.startsWith("/datasets"),
    },
    {
      href: "/analytics",
      label: "통계",
      icon: BarChart3,
      active: pathname.startsWith("/analytics"),
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">오픈데이터 카버스</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block w-64">
            <SearchComponent placeholder="검색..." />
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Auth 관련 컴포넌트 추가 */}
          {authLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <UserMenu />
          ) : (
            <AuthModal>
              <Button variant="outline" size="sm">
                로그인
              </Button>
            </AuthModal>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-4 mb-6">
                <SearchComponent placeholder="검색..." />
              </div>

              {/* 모바일 Auth 버튼 추가 */}
              <div className="mb-6">
                {user ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                    <UserMenu />
                  </div>
                ) : (
                  <AuthModal>
                    <Button className="w-full">로그인 / 회원가입</Button>
                  </AuthModal>
                )}
              </div>

              <nav className="flex flex-col gap-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary",
                      route.active ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </Link>
                ))}
                {user && (
                  <Link
                    href="/search-data"
                    className={cn(
                      "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary",
                      pathname.startsWith("/search-data") ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    데이터 검색
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
