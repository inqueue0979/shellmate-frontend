'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'

import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'

/**
 * 로그인 폼 유효성 검사 스키마
 * zod를 사용해서 클라이언트 측 유효성 검사를 정의합니다
 */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식을 입력해주세요.'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.')
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
})

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 로그인 후 리다이렉트할 경로 (미들웨어에서 설정)
  const redirectTo = searchParams.get('redirect') || '/'

  /**
   * react-hook-form 설정
   * - zodResolver: zod 스키마를 사용한 유효성 검사
   * - 기본값 설정
   */
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  /**
   * 로그인 폼 제출 핸들러
   *
   * @param {Object} data - 폼 데이터 { email, password }
   */
  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      setError('')

      console.log('로그인 시도:', { email: data.email })

      // AuthContext의 login 함수 호출
      const result = await login(data.email, data.password)

      if (result.success) {
        console.log('로그인 성공, 리다이렉트:', redirectTo)
        router.push(redirectTo)
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error('로그인 처리 중 오류:', error)
      setError('로그인 처리 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            로그인
          </CardTitle>
          <CardDescription className="text-center">
            셸메이트에 오신 것을 환영합니다
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* 에러 메시지 표시 */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* 로그인 폼 */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* 이메일 입력 필드 */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="이메일을 입력하세요"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 비밀번호 입력 필드 */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 로그인 버튼 */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
            </form>
          </Form>

          {/* 구분선 */}
          <div className="relative my-6">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">또는</span>
            </div>
          </div>

          {/* 회원가입 링크 */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              계정이 없으신가요?{' '}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                회원가입
              </Link>
            </p>
          </div>

          {/* 비밀번호 찾기 링크 */}
          <div className="text-center mt-2">
            <Link
              href="/forgot-password"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}