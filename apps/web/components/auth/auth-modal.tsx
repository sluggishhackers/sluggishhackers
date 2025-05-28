"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { LogIn, UserPlus, Loader2, AlertCircle, Play } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AuthModalProps {
  children: React.ReactNode
}

export default function AuthModal({ children }: AuthModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn, signUp, demoSignIn, isConfigured } = useAuth()
  const { toast } = useToast()

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await signIn(signInData.email, signInData.password)

      if (error) {
        toast({
          title: "로그인 실패",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "로그인 성공",
          description: "환영합니다!",
        })
        setOpen(false)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "회원가입 실패",
        description: "비밀번호가 일치하지 않습니다.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const { error } = await signUp(signUpData.email, signUpData.password)

      if (error) {
        toast({
          title: "회원가입 실패",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "회원가입 성공",
          description: "이메일을 확인하여 계정을 활성화해주세요.",
        })
        setOpen(false)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDemoSignIn = () => {
    demoSignIn()
    toast({
      title: "데모 로그인 성공",
      description: "데모 계정으로 로그인되었습니다.",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {!isConfigured && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              현재 데모 모드입니다. 실제 인증 기능을 사용하려면 Supabase 설정이 필요합니다.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue={isConfigured ? "signin" : "demo"} className="w-full">
          <TabsList className={`grid w-full ${isConfigured ? "grid-cols-2" : "grid-cols-3"}`}>
            {!isConfigured && <TabsTrigger value="demo">데모</TabsTrigger>}
            <TabsTrigger value="signin">로그인</TabsTrigger>
            <TabsTrigger value="signup">회원가입</TabsTrigger>
          </TabsList>

          {!isConfigured && (
            <TabsContent value="demo">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    데모 로그인
                  </CardTitle>
                  <CardDescription>데모 계정으로 로그인하여 모든 기능을 체험해보세요.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleDemoSignIn} className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    데모 계정으로 로그인
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LogIn className="h-5 w-5" />
                  로그인
                </CardTitle>
                <CardDescription>
                  {isConfigured
                    ? "데이터 검색 서비스를 이용하려면 로그인이 필요합니다."
                    : "현재 데모 모드에서는 실제 로그인이 불가능합니다."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">이메일</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      required
                      disabled={!isConfigured}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">비밀번호</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      required
                      disabled={!isConfigured}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading || !isConfigured}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    로그인
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  회원가입
                </CardTitle>
                <CardDescription>
                  {isConfigured
                    ? "새 계정을 만들어 데이터 검색 서비스를 이용하세요."
                    : "현재 데모 모드에서는 실제 회원가입이 불가능합니다."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">이메일</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      required
                      disabled={!isConfigured}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">비밀번호</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      required
                      disabled={!isConfigured}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">비밀번호 확인</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                      required
                      disabled={!isConfigured}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading || !isConfigured}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    회원가입
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
