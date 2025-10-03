// 토큰 관리 유틸리티 함수들
// 이 파일은 토큰을 안전하게 저장, 조회, 삭제하는 역할을 합니다.

// 메모리에 토큰을 임시 저장 (새로고침 시 사라짐)
let memoryTokens = {
  accessToken: null,
  refreshToken: null
}

/**
 * 쿠키에 토큰 저장
 * - accessToken: 짧은 만료시간 (60분)
 * - refreshToken: 긴 만료시간 (7일), httpOnly로 보안 강화
 */
export function setTokens(accessToken, refreshToken) {
  // 메모리에 accessToken 저장 (빠른 접근용)
  memoryTokens.accessToken = accessToken

  // 쿠키에 저장 (브라우저 재시작 시에도 유지)
  document.cookie = `accessToken=${accessToken}; max-age=${60 * 60}; path=/; secure; samesite=strict`
  document.cookie = `refreshToken=${refreshToken}; max-age=${7 * 24 * 60 * 60}; path=/; secure; samesite=strict; httpOnly`
}

/**
 * 쿠키에서 토큰 가져오기
 * 메모리에 있으면 메모리에서, 없으면 쿠키에서 가져옴
 */
export function getAccessToken() {
  // 메모리에 있으면 바로 반환 (성능 최적화)
  if (memoryTokens.accessToken) {
    return memoryTokens.accessToken
  }

  // 쿠키에서 찾기
  const cookies = document.cookie.split(';')
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='))

  if (tokenCookie) {
    const token = tokenCookie.split('=')[1]
    memoryTokens.accessToken = token // 메모리에도 저장
    return token
  }

  return null
}

/**
 * 서버사이드에서 쿠키 읽기 (미들웨어에서 사용)
 */
export function getTokenFromCookies(cookieString) {
  if (!cookieString) return null

  const cookies = cookieString.split(';')
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='))

  return tokenCookie ? tokenCookie.split('=')[1] : null
}

/**
 * 리프레시 토큰으로 새로운 accessToken 받기
 */
export async function refreshAccessToken() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  try {
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      credentials: 'include', // httpOnly 쿠키 포함
    })

    if (response.ok) {
      const data = await response.json()
      // 새로운 accessToken만 업데이트 (refreshToken은 서버에서 관리)
      memoryTokens.accessToken = data.access
      document.cookie = `accessToken=${data.access}; max-age=${60 * 60}; path=/; secure; samesite=strict`
      return data.access
    }
  } catch (error) {
    console.error('토큰 갱신 실패:', error)
  }

  return null
}

/**
 * 모든 토큰 삭제 (로그아웃)
 */
export function clearTokens() {
  memoryTokens.accessToken = null
  memoryTokens.refreshToken = null

  // 쿠키 삭제 (만료시간을 과거로 설정)
  document.cookie = 'accessToken=; max-age=0; path=/'
  document.cookie = 'refreshToken=; max-age=0; path=/'
}

/**
 * 토큰이 만료되었는지 확인
 * JWT 토큰의 exp 필드를 확인합니다
 */
export function isTokenExpired(token) {
  if (!token) return true

  try {
    // JWT의 payload 부분을 디코딩
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Math.floor(Date.now() / 1000)

    // exp는 초 단위 timestamp
    return payload.exp < currentTime
  } catch (error) {
    // 토큰 형식이 잘못된 경우 만료된 것으로 처리
    return true
  }
}