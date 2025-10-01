'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * AuthGuard 컴포넌트
 *
 * 역할:
 * 1. 미들웨어를 통과한 후 세밀한 인증 검사
 * 2. 로딩 상태 관리 및 사용자 경험 개선
 * 3. 권한별 접근 제어 (관리자, 일반 사용자 등)
 *
 * 사용법:
 * <AuthGuard>
 *   <ProtectedComponent />
 * </AuthGuard>
 *
 * 또는 권한 지정:
 * <AuthGuard requiredRole="admin">
 *   <AdminComponent />
 * </AuthGuard>
 */

// 로딩 스피너 컴포넌트
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
}

// 인증 필요 안내 컴포넌트
function AuthRequired() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h1>
        <p className="text-gray-600 mb-6">이 페이지를 보려면 먼저 로그인해주세요.</p>
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          로그인하기
        </button>
      </div>
    </div>
  )
}

// 권한 부족 안내 컴포넌트
function InsufficientPermissions() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">접근 권한이 없습니다</h1>
        <p className="text-gray-600 mb-6">이 페이지에 접근할 권한이 없습니다.</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  )
}

export default function AuthGuard({
  children,
  requiredRole = null,        // 필요한 권한 (null이면 로그인만 확인)
  fallback = null,            // 커스텀 로딩 컴포넌트
  redirectTo = '/login'       // 리다이렉트할 경로
}) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // 로딩이 완료되고 인증되지 않은 경우 리다이렉트
    if (!loading && !isAuthenticated) {
      console.log('AuthGuard: 인증되지 않은 사용자, 리다이렉트 실행')
      router.push(redirectTo)
    }
  }, [loading, isAuthenticated, router, redirectTo])

  // 1. 로딩 중일 때
  if (loading) {
    return fallback || <LoadingSpinner />
  }

  // 2. 로그인하지 않은 경우
  if (!isAuthenticated) {
    return <AuthRequired />
  }

  // 3. 특정 권한이 필요한 경우 권한 확인
  if (requiredRole && user?.role !== requiredRole) {
    console.log(`AuthGuard: 권한 부족. 필요: ${requiredRole}, 현재: ${user?.role}`)
    return <InsufficientPermissions />
  }

  // 4. 모든 조건을 만족하면 자식 컴포넌트 렌더링
  return children
}

/**
 * 페이지 단위에서 사용할 수 있는 HOC (Higher Order Component)
 *
 * 사용법:
 * export default withAuth(MyComponent)
 * 또는
 * export default withAuth(MyComponent, { requiredRole: 'admin' })
 */
export function withAuth(WrappedComponent, options = {}) {
  return function AuthenticatedComponent(props) {
    return (
      <AuthGuard {...options}>
        <WrappedComponent {...props} />
      </AuthGuard>
    )
  }
}

/**
 * 조건부 렌더링을 위한 훅
 *
 * 사용법:
 * const canAccess = useAuthGuard('admin')
 *
 * if (!canAccess) return <div>권한이 없습니다</div>
 */
export function useAuthGuard(requiredRole = null) {
  const { user, isAuthenticated, loading } = useAuth()

  // 로딩 중이면 null 반환
  if (loading) return null

  // 로그인하지 않은 경우
  if (!isAuthenticated) return false

  // 특정 권한이 필요한 경우
  if (requiredRole && user?.role !== requiredRole) return false

  return true
}