import { NextResponse } from 'next/server'
import { getTokenFromCookies } from './src/lib/auth'

/**
 * 미들웨어: 모든 페이지 요청 전에 실행됩니다
 *
 * 역할:
 * 1. 보호된 경로에 접근할 때 토큰 존재 여부 확인
 * 2. 토큰이 없으면 로그인 페이지로 리다이렉트
 * 3. 이미 로그인한 사용자가 로그인 페이지 접근 시 홈으로 리다이렉트
 */
export function middleware(request) {
  const { pathname } = request.nextUrl
  const cookieHeader = request.headers.get('cookie')
  const accessToken = getTokenFromCookies(cookieHeader)

  // 보호된 경로들 정의
  const protectedPaths = [
    '/home',
    '/community',
    '/column',
    '/consultation',
    '/profile',
    '/settings'
  ]

  // 인증이 필요 없는 공개 경로들
  const publicPaths = [
    '/',
    '/login',
    '/signup'
  ]

  console.log(`미들웨어 실행: ${pathname}, 토큰 존재: ${!!accessToken}`)

  // 1. 보호된 경로에 토큰 없이 접근하는 경우
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    if (!accessToken) {
      console.log('로그인이 필요합니다.')
      const loginUrl = new URL('/login', request.url)
      // 로그인 후 원래 페이지로 돌아갈 수 있도록 redirect 파라미터 추가
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // 2. 이미 로그인한 사용자가 로그인/회원가입 페이지 접근하는 경우
  if (accessToken && (pathname === '/login' || pathname === '/signup')) {
    console.log('이미 로그인된 사용자, 홈으로 리다이렉트')
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 3. 문제없으면 요청 그대로 진행
  return NextResponse.next()
}

/**
 * 미들웨어가 실행될 경로 설정
 *
 * matcher: 어떤 경로에서 미들웨어를 실행할지 정의
 * - /((?!api|_next/static|_next/image|favicon.ico).*):
 *   API 라우트, Next.js 정적 파일, 이미지, favicon을 제외한 모든 경로
 */
export const config = {
  matcher: [
    /*
     * 다음을 제외한 모든 request path에서 실행:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}